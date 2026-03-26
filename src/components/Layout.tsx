import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, ArrowUp, Sun, Moon, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import Lenis from "lenis";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showSplash]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.services, path: "/services" },
    { name: t.nav.projects, path: "/projects" },
    { name: t.nav.contact, path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-x-hidden transition-colors duration-300">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center pointer-events-none overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-zinc-500/20 blur-[100px] sm:blur-[120px] rounded-full" />
            
            <motion.div
              initial={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-pearl-light relative z-10"
            >
              EGSO
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className={`text-3xl font-bold tracking-tighter ${resolvedTheme === 'dark' ? 'text-pearl-light' : 'text-pearl'}`}>
              EGSO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-white ${
                  location.pathname === link.path ? "text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white" : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {resolvedTheme === "dark" ? (
                  <motion.div key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <Moon size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <Sun size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <Link
              to="/contact"
              className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              {t.nav.quote}
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4 z-50 relative">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {resolvedTheme === "dark" ? (
                  <motion.div key="moon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <Moon size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <Sun size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button
              className="p-2 -mr-2 text-zinc-900 dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-24 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-2 text-2xl font-medium mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-4 border-b border-zinc-100 dark:border-zinc-800 ${location.pathname === link.path ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-center rounded-2xl font-semibold"
              >
                {t.nav.quote}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 pt-12 pb-24 md:pt-16 md:pb-24">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold tracking-tighter text-pearl-light">EGSO</span>
            </Link>
            <p className="text-sm mb-6">
              {t.footer.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">{t.footer.services}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Rénovation Complète</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Aménagement Intérieur</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Second Œuvre</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Gestion de Projet</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">{t.footer.company}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/projects" className="hover:text-white transition-colors">{t.nav.projects}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">{t.footer.contact}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-zinc-500 shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t.footer.address }} />
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-zinc-500 shrink-0" />
                <a href="tel:+41796549789" className="hover:text-white transition-colors">+41 79 654 97 89</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-zinc-500 shrink-0" />
                <a href="mailto:contact@egso.ch" className="hover:text-white transition-colors">contact@egso.ch</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-zinc-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-center md:text-left">
          <p>{t.footer.rights}</p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">{t.footer.legal}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2 ml-2 md:ml-4 border-l border-zinc-700 pl-4">
              <Globe size={16} className="text-zinc-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "fr" | "en")}
                className="bg-transparent text-zinc-400 hover:text-white transition-colors outline-none cursor-pointer appearance-none"
              >
                <option value="fr" className="bg-zinc-900 text-white">FR</option>
                <option value="en" className="bg-zinc-900 text-white">EN</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-3 bg-zinc-900/80 dark:bg-zinc-100/80 backdrop-blur-md text-white dark:text-zinc-900 rounded-full shadow-lg hover:bg-zinc-800 dark:hover:bg-white transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
