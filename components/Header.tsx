import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Building2,
  LayoutGrid,
  Shield,
  CheckSquare,
  Kanban,
  Workflow,
  Users,
  BarChart3,
  Banknote,
  BriefcaseBusiness,
  Warehouse,
  ShoppingBag,
  Briefcase,
  Factory,
  Truck,
  Package,
  HardHat,
  Stethoscope,
  UtensilsCrossed,
  CalendarRange,
  FolderKanban,
  Newspaper,
  GraduationCap,
  TrendingUp,
  Handshake,
  type LucideIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { HeaderNavDropdown, HeaderNavDropdownTile } from './HeaderNavDropdown';
import { useLanguage } from '../contexts/LanguageContext';
import type { Lang } from '../translations';
import { MODULE_IDS, SOLUTION_SLUGS, type ModuleId, type SolutionSlug } from '../config/siteNavigation';
import { companyNavItems } from '../config/serviceRoutes';
import { paths } from '../routes/paths';

const moduleIcons: Record<ModuleId, LucideIcon> = {
  tasks: CheckSquare,
  funnel: Kanban,
  clients: Users,
  finance: Banknote,
  warehouse: Warehouse,
  processes: Workflow,
  analytics: BarChart3,
  team: BriefcaseBusiness,
};

const moduleIconStyles: Record<ModuleId, string> = {
  tasks: 'bg-emerald-100 text-emerald-800 border border-emerald-200/70',
  funnel: 'bg-sky-100 text-sky-800 border border-sky-200/70',
  clients: 'bg-violet-100 text-violet-800 border border-violet-200/70',
  finance: 'bg-amber-100 text-amber-900 border border-amber-200/70',
  warehouse: 'bg-teal-100 text-teal-900 border border-teal-200/70',
  processes: 'bg-indigo-100 text-indigo-900 border border-indigo-200/70',
  analytics: 'bg-cyan-100 text-cyan-900 border border-cyan-200/70',
  team: 'bg-rose-100 text-rose-900 border border-rose-200/70',
};

const solutionIcons: Record<SolutionSlug, LucideIcon> = {
  retail: ShoppingBag,
  services: Briefcase,
  manufacturing: Factory,
  logistics: Truck,
  wholesale: Package,
  construction: HardHat,
  healthcare: Stethoscope,
  hospitality: UtensilsCrossed,
};

const solutionIconStyles: Record<SolutionSlug, string> = {
  retail: 'bg-orange-100 text-orange-900 border border-orange-200/70',
  services: 'bg-violet-100 text-violet-900 border border-violet-200/70',
  manufacturing: 'bg-slate-200 text-slate-800 border border-slate-300/70',
  logistics: 'bg-sky-100 text-sky-900 border border-sky-200/70',
  wholesale: 'bg-amber-100 text-amber-900 border border-amber-200/70',
  construction: 'bg-yellow-100 text-yellow-900 border border-yellow-200/70',
  healthcare: 'bg-red-100 text-red-800 border border-red-200/70',
  hospitality: 'bg-lime-100 text-lime-900 border border-lime-200/70',
};

const companyNavTileMeta: Record<string, { Icon: LucideIcon; box: string }> = {
  [paths.work]: { Icon: CalendarRange, box: 'bg-emerald-100 text-emerald-800 border border-emerald-200/70' },
  [paths.cases]: { Icon: FolderKanban, box: 'bg-sky-100 text-sky-800 border border-sky-200/70' },
  [paths.news]: { Icon: Newspaper, box: 'bg-amber-100 text-amber-900 border border-amber-200/70' },
  [paths.education]: { Icon: GraduationCap, box: 'bg-indigo-100 text-indigo-900 border border-indigo-200/70' },
  [paths.investors]: { Icon: TrendingUp, box: 'bg-cyan-100 text-cyan-900 border border-cyan-200/70' },
  [paths.partners]: { Icon: Handshake, box: 'bg-rose-100 text-rose-900 border border-rose-200/70' },
};

const dropdownBodyGrid = 'p-2.5 sm:p-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5';

interface HeaderProps {
  onOpenModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'solutions' | 'modules' | 'company' | null>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        solutionsRef.current?.contains(target) ||
        modulesRef.current?.contains(target) ||
        companyRef.current?.contains(target)
      )
        return;
      setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const goToHash = (hash: string) => {
    const id = hash.startsWith('#') ? hash.slice(1) : hash;
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate({ pathname: '/', hash: id });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header
          role="banner"
          className={`pointer-events-auto w-full max-w-6xl rounded-full border py-3 px-4 md:px-6 transition-[box-shadow,background-color,border-color,backdrop-filter] duration-300 ease-out-expo ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-2xl shadow-nav border-slate-200/70'
              : 'bg-white/90 backdrop-blur-2xl border-slate-200/65 shadow-soft'
          }`}
        >
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <Link
              to={paths.home}
              aria-label={t('header.home')}
              className="flex items-center gap-2 group shrink-0 min-w-0"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="h-9 md:h-10 flex items-center justify-center shrink-0">
                <img
                  src="/logotip.svg"
                  alt=""
                  className="h-9 md:h-10 w-auto object-contain"
                  aria-hidden="true"
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 min-w-0 flex-1 justify-center" aria-label="Desktop navigation">
              <div ref={solutionsRef} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown((v) => (v === 'solutions' ? null : 'solutions'))}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink rounded-full hover:bg-slate-100/90 transition-colors duration-200"
                  aria-expanded={openDropdown === 'solutions'}
                >
                  {t('header.nav.solutions')}
                  <ChevronDown size={16} className={`opacity-60 transition-transform ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                </button>
                <HeaderNavDropdown
                  open={openDropdown === 'solutions'}
                  instanceKey="nav-solutions"
                  kicker={t('solutions.kicker')}
                  title={t('header.nav.solutions')}
                  icon={<Sparkles size={18} strokeWidth={2.2} aria-hidden />}
                  bodyClassName={dropdownBodyGrid}
                  bodyMaxHeightClass="max-h-[min(72vh,32rem)]"
                >
                  {SOLUTION_SLUGS.map((slug) => {
                    const SolIcon = solutionIcons[slug];
                    return (
                      <HeaderNavDropdownTile
                        key={slug}
                        to={paths.solution(slug)}
                        title={t(`solutions.${slug}.menu`)}
                        description={t(`solutions.${slug}.title`)}
                        icon={<SolIcon size={18} strokeWidth={2} />}
                        iconBoxClassName={solutionIconStyles[slug]}
                        onNavigate={() => setOpenDropdown(null)}
                      />
                    );
                  })}
                </HeaderNavDropdown>
              </div>

              <div ref={modulesRef} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown((v) => (v === 'modules' ? null : 'modules'))}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink rounded-full hover:bg-slate-100/90 transition-colors duration-200"
                  aria-expanded={openDropdown === 'modules'}
                >
                  {t('header.nav.modulesMenu')}
                  <ChevronDown size={16} className={`opacity-60 transition-transform ${openDropdown === 'modules' ? 'rotate-180' : ''}`} />
                </button>
                <HeaderNavDropdown
                  open={openDropdown === 'modules'}
                  instanceKey="nav-modules"
                  kicker={t('modules.heading')}
                  title={t('header.nav.modulesMenu')}
                  icon={<LayoutGrid size={18} strokeWidth={2.2} aria-hidden />}
                  bodyClassName={dropdownBodyGrid}
                  bodyMaxHeightClass="max-h-[min(72vh,34rem)]"
                >
                  {MODULE_IDS.map((id) => {
                    const ModIcon = moduleIcons[id];
                    return (
                      <HeaderNavDropdownTile
                        key={id}
                        to={paths.module(id)}
                        title={t(`modules.${id}.label`)}
                        description={t(`modules.${id}.title`)}
                        icon={<ModIcon size={18} strokeWidth={2} />}
                        iconBoxClassName={moduleIconStyles[id]}
                        onNavigate={() => setOpenDropdown(null)}
                      />
                    );
                  })}
                </HeaderNavDropdown>
              </div>

              <div ref={companyRef} className="relative hidden lg:block">
                <button
                  type="button"
                  onClick={() => setOpenDropdown((v) => (v === 'company' ? null : 'company'))}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink rounded-full hover:bg-slate-100/90 transition-colors duration-200"
                  aria-expanded={openDropdown === 'company'}
                >
                  {t('header.nav.company')}
                  <ChevronDown size={16} className={`opacity-60 transition-transform ${openDropdown === 'company' ? 'rotate-180' : ''}`} />
                </button>
                <HeaderNavDropdown
                  open={openDropdown === 'company'}
                  instanceKey="nav-company"
                  kicker={t('footer.company')}
                  title={t('header.nav.company')}
                  icon={<Building2 size={18} strokeWidth={2.2} aria-hidden />}
                  bodyClassName={dropdownBodyGrid}
                  bodyMaxHeightClass="max-h-[min(72vh,30rem)]"
                  footer={
                        <div className="px-4 py-3">
                          <div className="flex items-center gap-1.5 mb-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            <Shield size={12} className="text-slate-500 shrink-0" aria-hidden />
                            <span>{t('header.companyLegalLinks')}</span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            <Link
                              to={paths.privacy}
                              className="text-xs font-medium text-ink-muted hover:text-brand transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {t('footer.privacy')}
                            </Link>
                            <Link
                              to={paths.terms}
                              className="text-xs font-medium text-ink-muted hover:text-brand transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {t('footer.terms')}
                            </Link>
                            <Link
                              to={paths.cookies}
                              className="text-xs font-medium text-ink-muted hover:text-brand transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {t('footer.cookies')}
                            </Link>
                          </div>
                        </div>
                      }
                    >
                  {companyNavItems.map(({ to, labelKey, descKey }) => {
                    const meta = companyNavTileMeta[to];
                    if (!meta) return null;
                    const CompIcon = meta.Icon;
                    return (
                      <HeaderNavDropdownTile
                        key={to}
                        to={to}
                        title={t(labelKey)}
                        description={t(descKey)}
                        icon={<CompIcon size={18} strokeWidth={2} />}
                        iconBoxClassName={meta.box}
                        onNavigate={() => setOpenDropdown(null)}
                      />
                    );
                  })}
                </HeaderNavDropdown>
              </div>
            </nav>

            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenModal}
                className="whitespace-nowrap"
                data-testid="header-cta-contact"
              >
                {t('header.cta')}
              </Button>
            </div>

            <div className="flex md:hidden items-center gap-2 shrink-0">
              <button
                className="text-ink p-2 rounded-full hover:bg-slate-100/90 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? t('header.menu.close') : t('header.menu.open')}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-2xl pt-28 px-6 md:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col gap-8 pb-12" aria-label="Mobile navigation">
              <div>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">{t('header.nav.solutions')}</p>
                <div className="flex flex-col gap-2">
                  {SOLUTION_SLUGS.map((slug) => (
                    <Link
                      key={slug}
                      to={paths.solution(slug)}
                      className="text-lg font-semibold text-ink hover:text-brand py-1 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(`solutions.${slug}.menu`)}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">{t('header.nav.modulesMenu')}</p>
                <div className="flex flex-col gap-2">
                  {MODULE_IDS.map((id) => (
                    <Link
                      key={id}
                      to={paths.module(id)}
                      className="text-lg font-semibold text-ink hover:text-brand py-1 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(`modules.${id}.label`)}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">{t('header.nav.company')}</p>
                <div className="flex flex-col gap-2">
                  {companyNavItems.map(({ to, labelKey }) => (
                    <Link
                      key={to}
                      to={to}
                      className="text-lg font-semibold text-ink hover:text-brand py-1 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(labelKey)}
                    </Link>
                  ))}
                  <Link
                    to={paths.privacy}
                    className="text-sm font-medium text-ink-muted hover:text-brand py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('footer.privacy')}
                  </Link>
                  <Link
                    to={paths.terms}
                    className="text-sm font-medium text-ink-muted hover:text-brand py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('footer.terms')}
                  </Link>
                  <Link
                    to={paths.cookies}
                    className="text-sm font-medium text-ink-muted hover:text-brand py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('footer.cookies')}
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">{t('header.home')}</p>
                <button
                  type="button"
                  className="text-left w-full text-lg font-semibold text-ink hover:text-brand py-1 transition-colors duration-200"
                  onClick={() => goToHash('#system-modules')}
                >
                  {t('modules.heading')}
                </button>
              </div>

              <div className="h-px bg-slate-200/80 w-full" />
              <Button
                variant="primary"
                className="w-full text-lg py-4"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenModal();
                }}
              >
                {t('header.startProject')}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
