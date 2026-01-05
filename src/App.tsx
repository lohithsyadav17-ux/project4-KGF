import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import GoldParticles from './components/GoldParticles/GoldParticles';
import FireEmbers from './components/Ambient/FireEmbers';
import CustomCursor from './components/CustomCursor/CustomCursor';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import SEO from './components/SEO/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';
import './App.css';

// Lazy load below-the-fold components
const StatsCounter = lazy(() => import('./components/StatsCounter/StatsCounter'));
const CharacterSection = lazy(() => import('./components/CharacterCard/CharacterCard'));
const ChapterGuide = lazy(() => import('./components/ChapterGuide/ChapterGuide'));
const Gallery = lazy(() => import('./components/Gallery/Gallery'));
const Footer = lazy(() => import('./components/Footer/Footer'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="app">
      <SEO />
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <LoadingScreen key="loader" onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <CustomCursor />
            <GoldParticles />
            <FireEmbers />
            <Navbar />
            <main>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Hero />
              </motion.div>

              <Suspense fallback={<div className="p-20 text-center text-gold">Loading Empire Data...</div>}>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }}>
                  <StatsCounter />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }}>
                  <CharacterSection />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }}>
                  <Gallery />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }}>
                  <ChapterGuide />
                </motion.div>
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
