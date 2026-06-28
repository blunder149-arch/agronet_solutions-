import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=800&q=80', category: 'Cakes', title: 'Chocolate Truffle Cake' },
  { url: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&q=80', category: 'Cakes', title: 'Red Velvet Cake' },
  { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', category: 'Cakes', title: 'Black Forest Cake' },
  { url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80', category: 'Cakes', title: 'Blueberry Cheesecake' },
  { url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80', category: 'Cupcakes', title: 'Assorted Cupcakes' },
  { url: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80', category: 'Cupcakes', title: 'Chocolate Fudge Cupcake' },
  { url: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80', category: 'Cupcakes', title: 'Red Velvet Cupcake' },
  { url: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=800&q=80', category: 'Pastries', title: 'Butter Croissant' },
  { url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', category: 'Pastries', title: 'Fruit Tarts' },
  { url: 'https://images.unsplash.com/photo-1549590143-d5855148a9d5?w=800&q=80', category: 'Pastries', title: 'Cinnamon Roll' },
  { url: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?w=800&q=80', category: 'Bread', title: 'Artisan Sourdough' },
  { url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80', category: 'Bread', title: 'Fresh Baguette' },
  { url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', category: 'Cookies', title: 'Choco Chip Cookies' },
  { url: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?w=800&q=80', category: 'Donuts', title: 'Chocolate Glazed Donut' },
  { url: 'https://images.unsplash.com/photo-1618411640018-972400a01458?w=800&q=80', category: 'Donuts', title: 'Assorted Donuts' },
  { url: 'https://images.unsplash.com/photo-1689037676470-b72230d5236e?w=800&q=80', category: 'Interior', title: 'Bakery Interior' },
  { url: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80', category: 'Interior', title: 'Bakery Display' },
  { url: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&q=80', category: 'Interior', title: 'Coffee Corner' },
];

const categories = ['All', 'Cakes', 'Cupcakes', 'Pastries', 'Bread', 'Cookies', 'Donuts', 'Interior'];

export function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'All' ? galleryImages : galleryImages.filter(img => img.category === active);

  const prev = () => setLightbox(i => (i! > 0 ? i! - 1 : filtered.length - 1));
  const next = () => setLightbox(i => (i! < filtered.length - 1 ? i! + 1 : 0));

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-5xl font-heading font-bold mb-6">Our Gallery</h1>
          <p className="text-chocolate/70 text-lg">A visual taste of what we create every day at Mr. Bakery.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                active === cat ? 'bg-chocolate text-white shadow-md' : 'bg-white text-chocolate hover:bg-pink/20 border border-chocolate/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence>
            {filtered.map((img, idx) => (
              <motion.div
                key={img.url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm cursor-pointer"
                onClick={() => setLightbox(idx)}
              >
                <ImageWithFallback
                  src={img.url}
                  alt={img.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-chocolate/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <span className="text-white font-heading font-bold text-lg tracking-wide">{img.title}</span>
                  <span className="text-white/70 text-sm uppercase tracking-wider">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 hover:text-gold transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 text-white p-2 hover:text-gold transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].url}
                alt={filtered[lightbox].title}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <p className="text-white text-center mt-4 font-heading text-xl">{filtered[lightbox].title}</p>
              <p className="text-white/50 text-center text-sm">{lightbox + 1} / {filtered.length}</p>
            </motion.div>

            <button
              className="absolute right-4 text-white p-2 hover:text-gold transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}