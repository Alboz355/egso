import { motion } from "framer-motion";
import { Paintbrush, Hammer, Ruler, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useLanguage } from "../components/LanguageProvider";

export default function Services() {
  const { t } = useLanguage();
  
  const services = [
    {
      id: "renovation",
      icon: <Hammer size={32} />,
      title: t.services.items[0].title,
      description: t.services.items[0].description,
      features: t.services.items[0].features,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop"
    },
    {
      id: "amenagement",
      icon: <Ruler size={32} />,
      title: t.services.items[1].title,
      description: t.services.items[1].description,
      features: t.services.items[1].features,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: "second-oeuvre",
      icon: <Wrench size={32} />,
      title: t.services.items[2].title,
      description: t.services.items[2].description,
      features: t.services.items[2].features,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2787&auto=format&fit=crop"
    },
    {
      id: "finitions",
      icon: <Paintbrush size={32} />,
      title: t.services.items[3].title,
      description: t.services.items[3].description,
      features: t.services.items[3].features,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2939&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 pt-24 md:pt-32 pb-16 md:pb-20 transition-colors duration-300">
      <SEO 
        title={t.meta.servicesTitle} 
        description={t.meta.servicesDesc} 
        url="https://egso.ch/services"
      />
      {/* Header */}
      <section className="container mx-auto px-6 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 md:mb-6">
            {t.services.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-light">
            {t.services.desc}
          </p>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-6">
        <div className="space-y-20 md:space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 md:gap-12 lg:gap-24 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-zinc-900/10 z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                  {service.icon}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 md:mb-6">{service.title}</h2>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mb-6 md:mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium text-sm sm:text-base">
                      <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors group text-sm sm:text-base"
                >
                  {t.services.quoteBtn}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
