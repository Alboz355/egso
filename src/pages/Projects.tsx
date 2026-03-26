import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../components/LanguageProvider";
import projectsData from "../data/projects.json";

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  const projects = projectsData.map((p, index) => ({
    id: p.id,
    title: t.projects.items[index]?.title || p.title,
    category: t.projects.items[index]?.category || p.category,
    image: p.image,
    description: t.projects.items[index]?.description || p.description
  }));

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 pt-24 md:pt-32 pb-16 md:pb-20 min-h-screen transition-colors duration-300">
      <SEO 
        title={t.meta.projectsTitle} 
        description={t.meta.projectsDesc} 
        url="https://egso.ch/projects"
      />
      <div className="container mx-auto px-6 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 md:mb-6">
            {t.projects.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-light">
            {t.projects.desc}
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(index)}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 md:mb-6">
                <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-zinc-900/40 transition-colors duration-500 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover Content */}
                <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium mb-3 md:mb-4 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-zinc-200 text-xs md:text-sm line-clamp-3 mb-4">{project.description}</p>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-zinc-900 flex items-center justify-center">
                      <ArrowUpRight size={16} className="md:w-5 md:h-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="group-hover:opacity-0 transition-opacity duration-300 px-1">
                <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white mb-1">{project.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(null);
              }}
            >
              <X size={32} />
            </button>
            
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject((prev) => (prev !== null && prev > 0 ? prev - 1 : projects.length - 1));
              }}
            >
              <ChevronLeft size={48} />
            </button>

            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject((prev) => (prev !== null && prev < projects.length - 1 ? prev + 1 : 0));
              }}
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={projects[selectedProject].image}
                alt={projects[selectedProject].title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-6 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-xs font-medium mb-3 uppercase tracking-wider">
                  {projects[selectedProject].category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{projects[selectedProject].title}</h3>
                <p className="text-zinc-300 text-sm md:text-base max-w-2xl mx-auto">{projects[selectedProject].description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="container mx-auto px-6 mt-20 md:mt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-zinc-900 dark:bg-zinc-900 text-white rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t.projects.ctaTitle}</h2>
          <p className="text-zinc-400 mb-6 md:mb-8 text-sm md:text-base">
            {t.projects.ctaDesc}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 bg-white text-zinc-900 rounded-full font-bold text-base md:text-lg hover:bg-zinc-200 transition-colors"
          >
            {t.projects.ctaBtn}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
