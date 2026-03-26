import { motion, useScroll, useTransform, useSpring, useInView, useMotionValueEvent } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../components/LanguageProvider";

function MethodStep({ step, index }: { step: any, index: number }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  
  // The line's bottom is always exactly at the center of the viewport.
  // By tracking when the dot's center crosses the center of the viewport,
  // we perfectly sync the validation with the line touching the dot!
  const { scrollYProgress } = useScroll({
    target: dotRef,
    offset: ["center center", "end start"]
  });
  
  const [isValidated, setIsValidated] = useState(false);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && !isValidated) setIsValidated(true);
    else if (latest === 0 && isValidated) setIsValidated(false);
  });

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
      {/* Dot */}
      <motion.div 
        ref={dotRef}
        animate={{ 
          backgroundColor: isValidated ? "var(--dot-bg-active)" : "var(--dot-bg)",
          color: isValidated ? "var(--dot-text-active)" : "var(--dot-text)",
          borderColor: isValidated ? "var(--dot-border-active)" : "var(--dot-border)",
          scale: isValidated ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute left-8 md:left-1/2 w-12 h-12 md:w-16 md:h-16 border-4 rounded-full -translate-x-1/2 flex items-center justify-center z-10 top-4 md:top-1/2 md:-translate-y-1/2 shadow-sm"
      >
        {isValidated ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CheckCircle2 size={24} className="md:w-7 md:h-7" />
          </motion.div>
        ) : (
          <span className="text-sm md:text-base font-bold">{step.num}</span>
        )}
      </motion.div>

      {/* Content */}
      <div className={`w-full pl-24 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:ml-auto'}`}>
        <motion.div
          animate={{
            opacity: isValidated ? 1 : 0.4,
            y: isValidated ? 0 : 20,
          }}
          transition={{ duration: 0.5 }}
          className={`bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl shadow-sm border transition-colors duration-300 ${isValidated ? 'border-zinc-300 dark:border-zinc-600 shadow-md' : 'border-zinc-100 dark:border-zinc-800'}`}
        >
          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-3">{step.title}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">{step.desc}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const methodRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: methodProgress } = useScroll({
    target: methodRef,
    offset: ["start center", "end center"],
  });

  const smoothMethodProgress = useSpring(methodProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const methodSteps = [
    {
      num: "01",
      title: t.home.methodSteps[0].title,
      desc: t.home.methodSteps[0].desc
    },
    {
      num: "02",
      title: t.home.methodSteps[1].title,
      desc: t.home.methodSteps[1].desc
    },
    {
      num: "03",
      title: t.home.methodSteps[2].title,
      desc: t.home.methodSteps[2].desc
    },
    {
      num: "04",
      title: t.home.methodSteps[3].title,
      desc: t.home.methodSteps[3].desc
    },
    {
      num: "05",
      title: t.home.methodSteps[4].title,
      desc: t.home.methodSteps[4].desc
    }
  ];

  const services = [
    {
      title: t.services.items[0].title,
      description: t.services.items[0].description,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop",
    },
    {
      title: t.services.items[1].title,
      description: t.services.items[1].description,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
    },
    {
      title: t.services.items[2].title,
      description: t.services.items[2].description,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2787&auto=format&fit=crop",
    },
  ];

  const stats = [
    { value: t.home.stats[0].value, label: t.home.stats[0].label },
    { value: t.home.stats[1].value, label: t.home.stats[1].label },
    { value: t.home.stats[2].value, label: t.home.stats[2].label },
  ];

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <SEO 
        title={t.meta.homeTitle} 
        description={t.meta.homeDesc} 
        url="https://egso.ch/"
      />
      {/* Hero Section */}
      <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-zinc-900/40 z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2893&auto=format&fit=crop"
            alt="Intérieur luxueux rénové"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium mb-6 uppercase tracking-widest">
              {t.home.heroBadge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              {t.home.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-200 mb-10 max-w-2xl mx-auto font-light px-4">
              {t.home.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-900 rounded-full font-semibold text-base sm:text-lg hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
              >
                {t.home.heroProjectsBtn}
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900/50 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold text-base sm:text-lg hover:bg-zinc-800/50 transition-colors flex items-center justify-center"
              >
                {t.home.heroQuoteBtn}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-zinc-900 dark:bg-zinc-900 text-white relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center px-4 py-6 sm:py-0"
              >
                <div className="text-4xl sm:text-5xl font-bold mb-2 text-zinc-100">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-base text-zinc-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Transition 1 */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-zinc-900 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 relative z-20" />

      {/* Services Overview */}
      <section className="pb-20 md:pb-32 relative z-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 md:mb-6">
                {t.home.expertiseTitle}
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                {t.home.expertiseDesc}
              </p>
            </div>
            <Link
              to="/services"
              className="group flex items-center gap-2 text-zinc-900 dark:text-white font-semibold hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {t.home.expertiseAll}
              <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <ChevronRight size={18} />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                  <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-4">{service.description}</p>
                <Link to="/services" className="text-zinc-900 dark:text-white font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t.home.discover} <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Transition 2 */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 relative z-20" />

      {/* Why Choose Us / Value Proposition */}
      <section className="pb-20 md:pb-32 bg-white dark:bg-zinc-900 relative z-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8">
                {t.home.whyUsTitle}
              </h2>
              <div className="space-y-6 md:space-y-8">
                {[
                  {
                    title: t.home.whyUsItems[0].title,
                    desc: t.home.whyUsItems[0].desc,
                  },
                  {
                    title: t.home.whyUsItems[1].title,
                    desc: t.home.whyUsItems[1].desc,
                  },
                  {
                    title: t.home.whyUsItems[2].title,
                    desc: t.home.whyUsItems[2].desc,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white">
                      <CheckCircle2 size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white mb-1 md:mb-2">{item.title}</h3>
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mt-12 lg:mt-0"
            >
              <div className="aspect-square rounded-full bg-zinc-100 absolute -top-10 -right-10 w-full h-full -z-10 blur-3xl opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2831&auto=format&fit=crop"
                alt="Notre équipe au travail"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-2 md:-bottom-8 md:-left-8 bg-white dark:bg-zinc-800 p-4 md:p-6 rounded-2xl shadow-xl max-w-[260px] md:max-w-xs"
              >
                <div className="flex gap-1 text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="md:w-4 md:h-4" fill="currentColor" />)}
                </div>
                <p className="text-xs md:text-sm font-medium text-zinc-900 dark:text-white">{t.home.testimonialQuote}</p>
                <p className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 mt-2">{t.home.testimonialAuthor}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gradient Transition 3 */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 relative z-20" />

      {/* Methodology Section */}
      <section className="pb-20 md:pb-32 bg-zinc-50 dark:bg-zinc-950 relative z-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
              {t.home.methodTitle}
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {t.home.methodDesc}
            </p>
          </div>

          <div ref={methodRef} className="relative max-w-5xl mx-auto py-4 md:py-10">
            {/* The background line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2 rounded-full" />
            
            {/* The animated line */}
            <motion.div 
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-zinc-900 dark:bg-white -translate-x-1/2 origin-top rounded-full"
              style={{ scaleY: smoothMethodProgress }}
            />

            <div className="space-y-12 md:space-y-24">
              {methodSteps.map((step, index) => (
                <MethodStep key={index} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Transition 4 */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-zinc-50 to-zinc-950 relative z-20" />

      {/* CTA Section */}
      <section className="pb-20 md:pb-32 bg-zinc-950 text-white relative z-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8">
              {t.home.ctaTitle}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-8 md:mb-10 px-4">
              {t.home.ctaDesc}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 rounded-full font-bold text-base sm:text-lg hover:bg-zinc-200 transition-colors"
            >
              {t.home.ctaBtn}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
