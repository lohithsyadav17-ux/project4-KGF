import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = "K.G.F: Chapter 2 - The El Dorado",
    description = "Witness the rise of Rocky Bhai in Kolar Gold Fields. The official fan tribute page for K.G.F Chapter 2. Violence, Violence, Violence!",
    image = "/assets/hero-rocky.png",
    url = "https://kgf-tribute.vercel.app",
    keywords = "KGF, Rocky Bhai, Yash, Chapter 2, El Dorado, Gold, Movie, Sandalwood"
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            <meta name="theme-color" content="#FFD700" />
            <html lang="en" />
        </Helmet>
    );
};

export default SEO;
