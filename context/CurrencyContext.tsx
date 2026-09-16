"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "USD" | "COP" | "MXN" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceStr: string | number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (p) => String(p),
});

export const useCurrency = () => useContext(CurrencyContext);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load saved currency from localStorage if available
    const savedCurrency = localStorage.getItem("myah_currency") as Currency;
    if (savedCurrency && ["USD", "COP", "MXN", "EUR"].includes(savedCurrency)) {
      // eslint-disable-next-line
      setCurrencyState(savedCurrency);
    }

    // Fetch exchange rates
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setRates(data.rates);
        }
      })
      .catch(err => console.error("Error fetching exchange rates:", err));
  }, []);

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem("myah_currency", curr);
  };

  const formatPrice = (priceStr: string | number) => {
    if (!priceStr) return "";
    const str = String(priceStr);

    // If it's a quote string, return as is
    if (str.toLowerCase().includes("cotizar")) return str;

    // Extract numbers, removing commas first to parse correctly e.g., 1,499 -> 1499
    const match = str.replace(/,/g, '').match(/\d+(\.\d+)?/);
    if (!match) return str; // no numbers found

    const numericPrice = parseFloat(match[0]);
    const rate = rates[currency] || 1;
    let convertedPrice = numericPrice * rate;
    
    // Slight rounding for cleaner prices (e.g. 398900 -> 399000 for COP)
    if (currency === "COP") {
      convertedPrice = Math.round(convertedPrice / 1000) * 1000;
    } else if (currency === "MXN") {
      convertedPrice = Math.round(convertedPrice);
    }

    // Format output
    const formatter = new Intl.NumberFormat(currency === "EUR" ? "es-ES" : "es-CO", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: currency === "COP" ? 0 : 0
    });

    const formattedVal = formatter.format(convertedPrice);

    // Reconstruct the string if it has "Desde"
    if (str.toLowerCase().includes("desde")) {
      return `Desde ${formattedVal} ${currency}`;
    }

    return `${formattedVal} ${currency}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}
