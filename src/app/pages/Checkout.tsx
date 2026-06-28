import { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router';

export function Checkout() {
  const { items, cartTotal, removeFromCart, updateQuantity, setIsCartOpen } = useCart();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', payment: 'cod' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.address) return;
    setPlaced(true);
    setIsCartOpen(false);
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 text-center max-w-md w-full shadow-xl"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-heading font-bold mb-3">Order Placed! 🎉</h1>
          <p className="text-chocolate/70 mb-8">
            Thank you <strong>{form.name}</strong>! Your order has been received. We'll contact you on <strong>{form.phone}</strong> shortly.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-chocolate text-white rounded-full font-semibold hover:bg-chocolate-light transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center flex-col gap-4 px-4">
        <ShoppingBag className="w-16 h-16 text-chocolate/40" />
        <h2 className="text-2xl font-heading font-bold">Your cart is empty</h2>
        <Link to="/menu" className="px-8 py-4 bg-chocolate text-white rounded-full font-semibold hover:bg-chocolate-light transition-colors">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-heading font-bold mb-10 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Order Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 shadow-sm space-y-5"
          >
            <h2 className="text-2xl font-heading font-bold mb-2">Delivery Details</h2>

            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 9999999999' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-chocolate mb-1">{f.label}</label>
                <input
                  required
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  value={(form as any)[f.name]}
                  onChange={handleChange}
                  className="w-full bg-cream border border-chocolate/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-chocolate mb-1">Delivery Address</label>
              <textarea
                required
                name="address"
                rows={3}
                placeholder="House no, Street, City..."
                value={form.address}
                onChange={handleChange}
                className="w-full bg-cream border border-chocolate/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-chocolate mb-1">Payment Method</label>
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="w-full bg-cream border border-chocolate/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI / QR Code</option>
                <option value="card">Credit / Debit Card</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-chocolate text-white rounded-full font-bold text-lg hover:bg-chocolate-light transition-colors shadow-lg shadow-chocolate/20"
            >
              Place Order — ${cartTotal.toFixed(2)}
            </button>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm h-fit"
          >
            <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-heading font-semibold leading-tight">{item.name}</p>
                    <p className="text-sm text-chocolate/60">x{item.quantity}</p>
                  </div>
                  <p className="font-bold text-gold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-chocolate/10 pt-4 flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-heading font-bold text-gold">${cartTotal.toFixed(2)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
