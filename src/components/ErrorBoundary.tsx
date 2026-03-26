import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl border border-zinc-100 dark:border-zinc-800 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              Oups ! Une erreur est survenue.
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              Nous sommes désolés, mais quelque chose s'est mal passé. Veuillez recharger la page ou revenir à l'accueil.
            </p>
            <button
              onClick={() => window.location.href = "/"}
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors w-full"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
