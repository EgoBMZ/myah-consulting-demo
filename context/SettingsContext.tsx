"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface AppSettings {
  whatsappNumber: string;
  whatsappMessage: string;
  footerEmail: string;
  footerPhone: string;
  footerAddress: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedIn: string;
  isoNormsLinks: { label: string; href: string }[];
}

const defaultSettings: AppSettings = {
  whatsappNumber: "573000000000",
  whatsappMessage: "Hola, vengo de la web de MYAH Consulting. Me gustaría recibir asesoría.",
  footerEmail: "contacto@myahconsulting.com",
  footerPhone: "+57 300 000 0000",
  footerAddress: "Bogotá, Colombia",
  socialFacebook: "https://www.facebook.com/people/MYAH-Consulting/100067957115397/",
  socialInstagram: "https://www.instagram.com/myahconsulting?igsh=MXVhc3B0Ym50MTMyMA%3D%3D",
  socialLinkedIn: "https://www.linkedin.com/in/myah-consulting-70976a200",
  isoNormsLinks: [
    { label: "Certificar la calidad de mi empresa – ISO 9001", href: "/tienda" },
    { label: "Cumplir con seguridad y salud en el trabajo – ISO 45001", href: "/tienda" },
    { label: "Proteger la información de mi empresa – ISO 27001", href: "/tienda" },
    { label: "Cuidar el medio ambiente en mi operación – ISO 14001", href: "/tienda" },
    { label: "Prevenir el soborno y actuar con transparencia – ISO 37001", href: "/tienda" }
  ],
};

interface SettingsContextType {
  settings: AppSettings;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for real-time updates from Firebase
    const docRef = doc(db, "appSettings", "global");
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSettings({ ...defaultSettings, ...(docSnap.data() as AppSettings) });
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching app settings:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
