import { Helmet } from "react-helmet-async";
import { useLanguage } from "./LanguageProvider";

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  url?: string;
  image?: string;
}

export default function SEO({ title, description, type = "website", url = "https://egso.ch", image = "https://egso.ch/og-image.jpg" }: SEOProps) {
  const { language } = useLanguage();

  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    "name": "EGSO Sàrl",
    "image": image,
    "telephone": "+41796549789",
    "email": "info@egso.ch",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rue de l'Athénée 40",
      "addressLocality": "Genève",
      "postalCode": "1206",
      "addressCountry": "CH"
    },
    "url": url,
    "priceRange": "$$$",
    "description": "Entreprise générale spécialisée dans le second œuvre, rénovation et aménagement haut de gamme à Genève."
  };

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="EGSO Sàrl" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
