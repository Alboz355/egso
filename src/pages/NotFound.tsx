import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen flex items-center justify-center p-6">
      <SEO 
        title="Page non trouvée | EGSO Genève" 
        description="La page que vous recherchez n'existe pas." 
      />
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-black text-zinc-200 dark:text-zinc-800 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Page introuvable</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Désolé, la page que vous recherchez a peut-être été supprimée, a changé de nom ou est temporairement indisponible.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-full font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            <Home size={20} />
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
