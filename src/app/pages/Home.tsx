import { ArrowRight, Star, Truck, Award, Clock, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

const heroImages = [
  'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=1400&q=80',
  'https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=1400&q=80',
  'https://images.unsplash.com/photo-1623334044303-241021148842?w=1400&q=80',
  'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1400&q=80',
];

const features = [
  { icon: Clock, title: 'Freshly Baked Daily', desc: 'Baked from scratch every morning' },
  { icon: Award, title: 'Premium Ingredients', desc: 'Sourced from the finest local farms' },
  { icon: Heart, title: 'Custom Cake Orders', desc: 'Personalized for your special moments' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Delivered fresh to your doorstep' },
];

const featuredProducts = [
  { id: 'p1', name: 'Chocolate Truffle Cake', price: 45.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjB0cnVmZmxlJTIwY2FrZXxlbnwxfHx8fDE3ODI2NjQ3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'p2', name: 'Red Velvet Cake', price: 50.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB2ZWx2ZXQlMjBjYWtlfGVufDF8fHx8MTc4MjY2NDcwOXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'p3', name: 'Fresh Croissants', price: 12.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNyb2lzc2FudHxlbnwxfHx8fDE3ODI2NjQ3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'p4', name: 'Assorted Cupcakes', price: 24.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXBjYWtlc3xlbnwxfHx8fDE3ODI1NjAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export function Home() {
  const { addToCart } = useCart();
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Animated background images */}
        <AnimatePresence>
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 z-0"
          >
            <ImageWithFallback
              src={heroImages[currentImg]}
              alt="Bakery hero"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Strong dark overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImg(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentImg ? 'bg-gold w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>

        <div className="container relative z-10 px-4 text-center text-white mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <Star className="w-4 h-4 text-gold fill-gold" />
              <Star className="w-4 h-4 text-gold fill-gold" />
              <Star className="w-4 h-4 text-gold fill-gold" />
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span className="text-sm font-medium ml-2">Rated 4.9/5 by Thousands</span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight text-white"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              Freshly Baked <span className="text-gold">Happiness</span> Every Day
            </h1>

            <p
              className="text-xl md:text-2xl text-white mb-10 font-light"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.9)' }}
            >
              Artisan Cakes • Fresh Bread • Pastries • Cookies • Custom Celebration Cakes
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/menu"
                className="px-8 py-4 bg-gold text-white rounded-full font-semibold hover:bg-yellow-600 transition-colors w-full sm:w-auto shadow-lg"
              >
                Explore Menu
              </Link>
              <Link
                to="/menu"
                className="px-8 py-4 bg-white text-chocolate rounded-full font-semibold hover:bg-cream transition-colors w-full sm:w-auto shadow-lg"
              >
                Order Online
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(92,58,33,0.04)] text-center hover:-translate-y-2 transition-transform duration-300 border border-chocolate/5"
              >
                <div className="w-16 h-16 bg-pink/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-chocolate">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{feature.title}</h3>
                <p className="text-chocolate/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Our Signature Bakes</h2>
            <p className="text-chocolate/70 text-lg">Handcrafted with love and the finest ingredients for your perfect moment.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-cream rounded-3xl overflow-hidden group border border-chocolate/5"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    {product.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-gold">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 rounded-full bg-chocolate text-white flex items-center justify-center hover:bg-gold transition-colors shadow-lg"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-chocolate font-bold hover:text-gold transition-colors"
            >
              View Full Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-chocolate-dark text-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-chocolate rounded-3xl p-8 md:p-12 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block uppercase tracking-wider">Weekend Special</span>
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">Buy 1 Get 1 on Cupcakes</h3>
                <p className="text-cream/80 mb-8 max-w-sm">Treat yourself and your loved ones to our signature artisan cupcakes this weekend.</p>
                <button className="px-6 py-3 bg-white text-chocolate rounded-full font-semibold hover:bg-gold hover:text-white transition-colors">
                  Claim Offer
                </button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 opacity-20 group-hover:scale-110 transition-transform duration-700">
                <ImageWithFallback src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXBjYWtlc3xlbnwxfHx8fDE3ODI1NjAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="cupcakes" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            
            <div className="bg-pink text-chocolate rounded-3xl p-8 md:p-12 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="bg-white text-chocolate text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block uppercase tracking-wider">Celebration</span>
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">20% Off Birthday Cakes</h3>
                <p className="text-chocolate/80 mb-8 max-w-sm">Make your special day even sweeter with our custom designed birthday cakes.</p>
                <button className="px-6 py-3 bg-chocolate text-white rounded-full font-semibold hover:bg-chocolate-light transition-colors">
                  Order Now
                </button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 opacity-20 group-hover:scale-110 transition-transform duration-700">
                <ImageWithFallback src="https://images.unsplash.com/photo-1586788680434-30d324b2d46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB2ZWx2ZXQlMjBjYWtlfGVufDF8fHx8MTc4MjY2NDcwOXww&ixlib=rb-4.1.0&q=80&w=1080" alt="cake" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">What Our Customers Say</h2>
            <p className="text-chocolate/70 text-lg">Real love from real people who can't get enough of our bakes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Priya Sharma', role: 'Regular Customer', review: 'The chocolate truffle cake was absolutely divine! Every celebration in our family now needs a Mr. Bakery cake. The quality and taste are unmatched.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
              { name: 'Rahul Mehta', role: 'Birthday Dad', review: 'Ordered a custom birthday cake for my daughter — it was gorgeous AND delicious. The team was so helpful and delivered it perfectly on time!', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
              { name: 'Sneha Patel', role: 'Office Manager', review: 'We order their croissants and pastries every week for our office. The freshness and consistency is incredible. Everyone in the office loves it!', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-chocolate/5 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-chocolate/80 leading-relaxed mb-6 flex-1">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-heading font-bold">{t.name}</p>
                    <p className="text-sm text-chocolate/60">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1689037676470-b72230d5236e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3ODI1NTYxODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-cream/90 backdrop-blur-sm" />
        </div>
        
        <div className="container relative z-10 px-4 text-center max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">Make Every Celebration Sweeter</h2>
          <p className="text-xl text-chocolate/80 mb-10">Whether it's a wedding, birthday, or just a Tuesday, our artisanal bakes are crafted to bring joy to your table.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/menu" className="px-8 py-4 bg-chocolate text-white rounded-full font-semibold hover:bg-chocolate-light transition-colors">
              Order Now
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-white text-chocolate rounded-full font-semibold hover:bg-pink/20 transition-colors border border-chocolate/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
