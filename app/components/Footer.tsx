"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex-shrink-0 flex items-center">
               <div className="bg-white px-3 py-1.5 rounded-xl inline-block shadow-sm">
                  <Image src="/logoMyahConsulting.png" alt="Myah Consulting Logo" width={140} height={40} className="object-contain h-8 w-auto" />
               </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mt-4">
              {t.footer.description}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.linkedin.com/in/myah-consulting-70976a200" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://www.instagram.com/myahconsulting?igsh=MXVhc3B0Ym50MTMyMA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.facebook.com/people/MYAH-Consulting/100067957115397/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label="Facebook">
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
                <Link href="#iso-9001" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">ISO 9001</Link>
              </li>
              <li>
                <Link href="#iso-14001" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">ISO 14001</Link>
              </li>
              <li>
                <Link href="#iso-45001" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">ISO 45001</Link>
              </li>
              <li>
                <Link href="#iso-27001" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">ISO 27001</Link>
              </li>
              <li>
                <Link href="#mejora" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">Mejora Continua</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t.footer.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Bogotá, Colombia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  +57 300 000 0000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  contacto@myahconsulting.com
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
