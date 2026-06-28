import { Link, Outlet, useLocation } from 'react-router';
import { ShoppingBag, Menu, X, Facebook, Instagram, Twitter, ChevronUp, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { BakeryChatbot } from './BakeryChatbot';

export function Layout() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Successfully subscribed to our newsletter! 🥖');
    setEmail('');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" richColors />
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="text-2xl md:text-3xl font-heading font-bold text-chocolate flex items-center gap-2">
            <span className="text-gold">Mr.</span> Bakery
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium hover:text-gold transition-colors ${
                  location.pathname === link.path ? 'text-gold' : 'text-chocolate'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-chocolate hover:text-gold transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-gold text-white text-xs font-bold rounded-full flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-chocolate"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="p-4 flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="w-8 h-8 text-chocolate" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 pt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-2xl font-heading font-medium text-chocolate hover:text-gold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
      <BakeryChatbot />

      <main className="flex-grow pt-[104px]">
        <Outlet />
      </main>

      <footer className="bg-chocolate-dark text-cream pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link to="/" className="text-3xl font-heading font-bold text-white mb-6 block">
                <span className="text-gold">Mr.</span> Bakery
              </Link>
              <p className="text-cream/80 mb-6">
                Freshly baked happiness every day. Artisan cakes, breads, and pastries crafted with love and premium ingredients.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-heading font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-cream/80 hover:text-gold transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-heading font-semibold mb-6 text-white">Contact Us</h4>
              <ul className="space-y-3 text-cream/80">
                <li>123 Bakery Street, Daman, India</li>
                <li>hello@mrbakery.com</li>
                <li>+91 9993550851</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-heading font-semibold mb-6 text-white">Newsletter</h4>
              <p className="text-cream/80 mb-4">Subscribe to get special offers and updates.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2 w-full text-white placeholder:text-white/50 focus:outline-none focus:border-gold"
                />
                <button type="submit" className="bg-gold text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-cream/60">
            <p>&copy; {new Date().getFullYear()} Mr. Bakery. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Back to top */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-chocolate text-white p-3 rounded-full shadow-lg hover:-translate-y-1 transition-transform"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Call button */}
        <a
          href="tel:+919993550851"
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg shadow-blue-500/30 hover:-translate-y-1 transition-transform"
        >
          <Phone className="w-6 h-6 fill-current" />
        </a>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/919993550851"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/30 hover:-translate-y-1 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

