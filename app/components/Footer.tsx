"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useSettings } from "../../context/SettingsContext";

export function Footer() {
  const { t } = useLanguage();
  const { settings } = useSettings();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex-shrink-0 flex items-center group">
               <div className="bg-white px-3 py-1.5 rounded-xl inline-flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Image src="/logoMyahConsulting.png" alt="Myah Consulting Logo" width={100} height={30} className="object-contain h-5 md:h-6 w-auto" style={{ width: 'auto', height: 'auto' }} />
               </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mt-4">
              {t.footer.description}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={settings.socialLinkedIn} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href={settings.socialInstagram} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href={settings.socialFacebook} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">{t.nav.home}</Link>
              </li>
              <li>
                <Link href="#servicios" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">{t.nav.services}</Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">{t.nav.about}</Link>
              </li>
              <li>
                <Link href="/tienda" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">{t.nav.store}</Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">{t.nav.blog}</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.footer.isoNorms}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tienda" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">Certificar la calidad de mi empresa – ISO 9001</Link>
              </li>
              <li>
                <Link href="/tienda" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">Cumplir con seguridad y salud en el trabajo – ISO 45001</Link>
              </li>
              <li>
                <Link href="/tienda" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">Proteger la información de mi empresa – ISO 27001</Link>
              </li>
              <li>
                <Link href="/tienda" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">Cuidar el medio ambiente en mi operación – ISO 14001</Link>
              </li>
              <li>
                <Link href="/tienda" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">Prevenir el soborno y actuar con transparencia – ISO 37001</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.footer.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent flex-shrink-0 mt-0.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span className="text-primary-foreground/70 text-sm">
                  {settings.footerAddress}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span className="text-primary-foreground/70 text-sm">
                  {settings.footerPhone}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <span className="text-primary-foreground/70 text-sm">
                  {settings.footerEmail}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Myah Consulting. {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terminos" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
