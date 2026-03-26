import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, MessageCircle, Loader2, Send } from "lucide-react";
import SEO from "../components/SEO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "../components/LanguageProvider";

const contactSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide / Invalid email address" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères / Message must be at least 10 characters" }),
  botcheck: z.string().max(0, { message: "Spam détecté / Spam detected" }).optional(), // Honeypot
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      message: "",
      botcheck: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (data.botcheck) {
      // Honeypot caught a bot
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@egso.ch", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          message: data.message,
          _subject: "Nouveau message depuis le site web EGSO"
        })
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 pt-24 md:pt-32 pb-16 md:pb-20 min-h-screen transition-colors duration-300">
      <SEO 
        title={t.meta.contactTitle} 
        description={t.meta.contactDesc} 
        url="https://egso.ch/contact"
      />
      <div className="container mx-auto px-6 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 md:mb-6">
            {t.contact.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-light">
            {t.contact.desc}
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <a 
              href="https://wa.me/41796549789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-8 md:p-10 rounded-3xl shadow-xl hover:bg-[#20bd5a] transition-all hover:-translate-y-1 flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle size={32} />
                  <h2 className="text-2xl md:text-3xl font-bold">WhatsApp</h2>
                </div>
                <p className="text-green-100 text-lg">{t.contact.whatsappDesc}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <ArrowUpRight size={24} />
              </div>
            </a>

            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3 mb-6">
                <Mail size={32} className="text-zinc-900 dark:text-white" />
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">{t.contact.emailTitle}</h2>
              </div>
              
              {submitSuccess ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-2xl border border-green-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{t.contact.formSuccessTitle}</h3>
                    <p className="text-green-700">{t.contact.formSuccessDesc}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                      {t.contact.formError}
                    </div>
                  )}
                  
                  {/* Honeypot field (hidden from users) */}
                  <input
                    type="checkbox"
                    className="hidden"
                    style={{ display: "none" }}
                    {...register("botcheck")}
                  />

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{t.contact.formEmailLabel}</label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-white'} rounded-xl focus:ring-2 focus:border-transparent transition-all outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500`}
                      placeholder={t.contact.formEmailPlaceholder}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{t.contact.formMessageLabel}</label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register("message")}
                      className={`w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800 border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-700 focus:ring-zinc-900 dark:focus:ring-white'} rounded-xl focus:ring-2 focus:border-transparent transition-all outline-none resize-none text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500`}
                      placeholder={t.contact.formMessagePlaceholder}
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        {t.contact.formSubmitting}
                      </>
                    ) : (
                      <>
                        {t.contact.formSubmit}
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-zinc-900 dark:bg-zinc-800 text-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">{t.contact.infoTitle}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-zinc-300 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-1">{t.contact.addressTitle}</h3>
                    <p className="text-zinc-400 text-sm md:text-base">Rue de l'Athénée 40<br/>1206 Genève</p>
                    <p className="text-zinc-500 text-xs md:text-sm mt-2">{t.contact.addressDesc}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-zinc-300 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-1">{t.contact.phoneTitle}</h3>
                    <a href="tel:+41796549789" className="text-zinc-400 hover:text-white transition-colors text-sm md:text-base">+41 79 654 97 89</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-zinc-300 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-1">{t.contact.emailTitle2}</h3>
                    <a href="mailto:info@egso.ch" className="text-zinc-400 hover:text-white transition-colors text-sm md:text-base">info@egso.ch</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-zinc-300 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-1">{t.contact.hoursTitle}</h3>
                    <p className="text-zinc-400 text-sm md:text-base">{t.contact.hoursDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Static Iframe */}
            <div className="bg-white dark:bg-zinc-900 p-2 rounded-3xl shadow-md border border-zinc-100 dark:border-zinc-800 overflow-hidden h-[300px] md:h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.642345091724!2d6.147986076753177!3d46.19770537109204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c652f144365c1%3A0x8f22069b1424613!2sRue%20de%20l&#39;Ath%C3%A9n%C3%A9e%2040%2C%201206%20Gen%C3%A8ve%2C%20Switzerland!5e0!3m2!1sen!2s!4v1716382000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1.25rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Rue de l'Athénée 40, Genève"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
