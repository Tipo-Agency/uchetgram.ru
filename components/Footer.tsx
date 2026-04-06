import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Send, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MODULE_IDS, SOLUTION_SLUGS } from '../config/siteNavigation';
import { paths } from '../routes/paths';
import { SITE_CONTACT } from '../config/siteContact';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-canvas border-t border-slate-200/70 pt-16 pb-10 text-ink overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" aria-hidden />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to={paths.home} className="flex items-center gap-2 mb-4 group" aria-label={t('header.home')}>
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logotip.svg" alt="" className="w-8 h-8 object-contain" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold tracking-tight text-ink group-hover:text-brand transition-colors duration-200">
                uchetgram<span className="text-brand">.ru</span>
              </span>
            </Link>
            <p className="text-ink-muted text-sm leading-relaxed mb-6 max-w-xs">{t('footer.tagline')}</p>
            <div className="flex gap-4">
              <a
                href={SITE_CONTACT.telegramUrl}
                aria-label="Telegram"
                className="w-10 h-10 rounded-full bg-canvas-elevated border border-slate-200/90 flex items-center justify-center text-ink-muted hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 shadow-soft"
              >
                <Send size={18} />
              </a>
              <a
                href="https://www.instagram.com/uchetgram.ru/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-canvas-elevated border border-slate-200/90 flex items-center justify-center text-ink-muted hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 shadow-soft"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/uchetgram.ru"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-canvas-elevated border border-slate-200/90 flex items-center justify-center text-ink-muted hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 shadow-soft"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-5 tracking-tight">{t('footer.solutions')}</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              {SOLUTION_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link to={paths.solution(slug)} className="hover:text-brand transition-colors duration-200">
                    {t(`solutions.${slug}.menu`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-5 tracking-tight">{t('footer.modules')}</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              {MODULE_IDS.map((id) => (
                <li key={id}>
                  <Link to={paths.module(id)} className="hover:text-brand transition-colors duration-200">
                    {t(`modules.${id}.label`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-5 tracking-tight">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li>
                <Link to={paths.work} className="hover:text-brand transition-colors duration-200">
                  {t('nav.work')}
                </Link>
              </li>
              <li>
                <Link to={paths.cases} className="hover:text-brand transition-colors duration-200">
                  {t('nav.cases')}
                </Link>
              </li>
              <li>
                <Link to={paths.news} className="hover:text-brand transition-colors duration-200">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link to={paths.education} className="hover:text-brand transition-colors duration-200">
                  {t('footer.education')}
                </Link>
              </li>
              <li>
                <Link to={paths.investors} className="hover:text-brand transition-colors duration-200">
                  {t('footer.investors')}
                </Link>
              </li>
              <li>
                <Link to={paths.partners} className="hover:text-brand transition-colors duration-200">
                  {t('footer.partners')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-5 tracking-tight">{t('footer.contacts')}</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li>Tashkent, Uzbekistan</li>
              <li>
                <a href={`tel:${SITE_CONTACT.phoneE164.replace(/\s/g, '')}`} className="hover:text-brand transition-colors duration-200 font-medium text-ink">
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONTACT.email}`} className="hover:text-brand transition-colors duration-200">
                  {SITE_CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/70 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink-muted/80 text-xs">
            © {new Date().getFullYear()} uchetgram.ru. {t('footer.copyright')}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-ink-muted/80">
            <Link to={paths.privacy} className="hover:text-ink transition-colors duration-200">
              {t('footer.privacy')}
            </Link>
            <Link to={paths.terms} className="hover:text-ink transition-colors duration-200">
              {t('footer.terms')}
            </Link>
            <Link to={paths.cookies} className="hover:text-ink transition-colors duration-200">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
