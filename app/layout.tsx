import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import { MainLayout } from "./components/MainLayout";
import { AuthProvider } from "../context/AuthContext";
import { CurrencyProvider } from "../context/CurrencyContext";
import { SettingsProvider } from "../context/SettingsContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myahconsulting.com"),
  title: "Consultoría en Gestión, ISO y Cumplimiento Empresarial | MYAH Consulting",
  description: "Organizamos tu empresa, te certificamos en ISO 9001, 14001, 45001, 27001 y 37001, y te preparamos para licitar y competir. Diagnóstico gratuito en minutos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <AuthProvider>
          <SettingsProvider>
            <LanguageProvider>
              <CurrencyProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <MainLayout>
                    {children}
                  </MainLayout>
                </ThemeProvider>
              </CurrencyProvider>
            </LanguageProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
