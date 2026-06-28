import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const categories = ['All', 'Cakes', 'Pastries', 'Bread', 'Cookies', 'Donuts', 'Cupcakes', 'Beverages', 'Combos'];

const menuItems = [
  // Cakes (6 items)
  { id: 'c1', category: 'Cakes', name: 'Chocolate Truffle Cake', price: 45.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=600&q=80' },
  { id: 'c2', category: 'Cakes', name: 'Red Velvet Cake', price: 50.0, rating: 4.8, image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80' },
  { id: 'c3', category: 'Cakes', name: 'Black Forest Cake', price: 40.0, rating: 4.7, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80' },
  { id: 'c4', category: 'Cakes', name: 'Pineapple Cake', price: 35.0, rating: 4.6, image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=600&q=80' },
  { id: 'c5', category: 'Cakes', name: 'Blueberry Cheesecake', price: 55.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80' },
  { id: 'c6', category: 'Cakes', name: 'Vanilla Caramel Cake', price: 42.0, rating: 4.8, image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=600&q=80' },

  // Pastries (6 items)
  { id: 'p1', category: 'Pastries', name: 'Butter Croissant', price: 4.5, rating: 4.9, image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=600&q=80' },
  { id: 'p2', category: 'Pastries', name: 'Assorted Fruit Tarts', price: 28.0, rating: 4.7, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80' },
  { id: 'p3', category: 'Pastries', name: 'Chocolate Eclair', price: 6.0, rating: 4.8, image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=600&q=80' },
  { id: 'p4', category: 'Pastries', name: 'Strawberry Pastry', price: 5.5, rating: 4.6, image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&q=80' },
  { id: 'p5', category: 'Pastries', name: 'Almond Croissant', price: 5.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1698899720612-dcbf89481ace?w=600&q=80' },
  { id: 'p6', category: 'Pastries', name: 'Cinnamon Roll', price: 4.5, rating: 4.7, image: 'https://images.unsplash.com/photo-1549590143-d5855148a9d5?w=600&q=80' },

  // Bread (6 items)
  { id: 'b1', category: 'Bread', name: 'Fresh Baguette', price: 6.0, rating: 4.7, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80' },
  { id: 'b2', category: 'Bread', name: 'Artisan Sourdough', price: 8.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?w=600&q=80' },
  { id: 'b3', category: 'Bread', name: 'Multigrain Loaf', price: 7.5, rating: 4.8, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80' },
  { id: 'b4', category: 'Bread', name: 'Garlic Bread', price: 5.0, rating: 4.6, image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&q=80' },
  { id: 'b5', category: 'Bread', name: 'Whole Wheat Bread', price: 6.5, rating: 4.7, image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80' },
  { id: 'b6', category: 'Bread', name: 'Rye Bread', price: 7.0, rating: 4.8, image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=600&q=80' },

  // Cookies (6 items)
  { id: 'k1', category: 'Cookies', name: 'Choco Chip Cookies', price: 12.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80' },
  { id: 'k2', category: 'Cookies', name: 'Butter Cookies', price: 10.0, rating: 4.7, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&q=80' },
  { id: 'k3', category: 'Cookies', name: 'Oatmeal Raisin', price: 11.0, rating: 4.8, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80' },
  { id: 'k4', category: 'Cookies', name: 'Macadamia Nut', price: 14.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=600&q=80' },
  { id: 'k5', category: 'Cookies', name: 'Double Chocolate', price: 13.0, rating: 4.8, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80' },
  { id: 'k6', category: 'Cookies', name: 'Peanut Butter Cookies', price: 12.0, rating: 4.7, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=80' },

  // Donuts (6 items)
  { id: 'd1', category: 'Donuts', name: 'Chocolate Glazed Donut', price: 3.5, rating: 4.6, image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?w=600&q=80' },
  { id: 'd2', category: 'Donuts', name: 'Box of Assorted Donuts', price: 18.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1618411640018-972400a01458?w=600&q=80' },
  { id: 'd3', category: 'Donuts', name: 'Strawberry Donut', price: 3.5, rating: 4.7, image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=600&q=80' },
  { id: 'd4', category: 'Donuts', name: 'Vanilla Sprinkle Donut', price: 3.5, rating: 4.8, image: 'https://images.unsplash.com/photo-1556040220-4096d522378d?w=600&q=80' },
  { id: 'd5', category: 'Donuts', name: 'Caramel Crunch', price: 4.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1565888396820-7f1b8bfb0b7a?w=600&q=80' },
  { id: 'd6', category: 'Donuts', name: 'Jelly Filled Donut', price: 4.0, rating: 4.6, image: 'https://images.unsplash.com/photo-1583527976878-c3a14b5e8f36?w=600&q=80' },

  // Cupcakes (6 items)
  { id: 'u1', category: 'Cupcakes', name: 'Vanilla Bean Cupcake', price: 4.0, rating: 4.8, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80' },
  { id: 'u2', category: 'Cupcakes', name: 'Chocolate Fudge Cupcake', price: 4.5, rating: 4.9, image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&q=80' },
  { id: 'u3', category: 'Cupcakes', name: 'Red Velvet Cupcake', price: 4.5, rating: 4.8, image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&q=80' },
  { id: 'u4', category: 'Cupcakes', name: 'Lemon Raspberry', price: 4.0, rating: 4.7, image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&q=80' },
  { id: 'u5', category: 'Cupcakes', name: 'Salted Caramel Cupcake', price: 4.5, rating: 4.9, image: 'https://images.unsplash.com/photo-1599785209796-786f0e59af25?w=600&q=80' },
  { id: 'u6', category: 'Cupcakes', name: 'Mini Party Cupcakes (6)', price: 15.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80' },

  // Beverages (4 items)
  { id: 'm7', category: 'Beverages', name: 'Artisan Latte', price: 5.5, rating: 4.9, image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=600&q=80' },
  { id: 'm8', category: 'Beverages', name: 'Cappuccino', price: 5.0, rating: 4.8, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80' },
  { id: 'm9', category: 'Beverages', name: 'Cold Coffee', price: 6.0, rating: 4.7, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80' },
  { id: 'm10', category: 'Beverages', name: 'Hot Chocolate', price: 5.5, rating: 4.9, image: 'https://images.unsplash.com/photo-1517701604599-b27434a59019?w=600&q=80' },

  // Combos (4 items)
  { id: 'co1', category: 'Combos', name: 'Family Dessert Box', price: 49.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80' },
  { id: 'co2', category: 'Combos', name: 'Party Pack', price: 65.0, rating: 4.8, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80' },
  { id: 'co3', category: 'Combos', name: 'Birthday Celebration Combo', price: 85.0, rating: 4.9, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80' },
  { id: 'co4', category: 'Combos', name: 'Office Snack Combo', price: 38.0, rating: 4.7, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80' },
];

export function Menu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-5xl font-heading font-bold mb-6">Our Menu</h1>
          <p className="text-chocolate/70 text-lg">Discover our selection of freshly baked goods, made daily with love and the finest ingredients.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Categories */}
          <div className="flex overflow-x-auto pb-4 w-full md:w-auto scrollbar-hide gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-chocolate text-white shadow-md'
                    : 'bg-white text-chocolate hover:bg-pink/20 border border-chocolate/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-chocolate/10 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-gold transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/40 w-5 h-5" />
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-chocolate/5 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider text-chocolate">
                    {item.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    {item.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-1">{item.name}</h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-bold text-gold">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 bg-cream text-chocolate rounded-full font-semibold hover:bg-gold hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-2xl font-heading font-bold mb-2">No items found</h3>
            <p className="text-chocolate/60">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
