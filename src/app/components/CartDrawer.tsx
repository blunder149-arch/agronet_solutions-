import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-chocolate z-50 cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-chocolate/10 flex items-center justify-between bg-white">
              <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-gold" />
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-cream rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="text-center py-12 text-chocolate/60">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Your cart is empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-3 bg-chocolate text-white rounded-full hover:bg-chocolate-light transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-chocolate/5">
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-heading font-semibold text-lg leading-tight">{item.name}</h3>
                        <p className="text-gold font-semibold mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-cream rounded-full px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-gold transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-gold transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-chocolate/10 shadow-[0_-10px_40px_rgba(92,58,33,0.05)]">
                <div className="flex justify-between items-center mb-4 text-lg font-medium">
                  <span>Subtotal</span>
                  <span className="font-heading font-bold text-xl">${cartTotal.toFixed(2)}</span>
                </div>
              <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 bg-chocolate text-white rounded-full font-semibold hover:bg-chocolate-light transition-colors shadow-lg shadow-chocolate/20 text-center block"
                >
                  Checkout Now
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
