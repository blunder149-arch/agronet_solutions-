import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', occasion: '', date: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;
    toast.success('Your reservation/custom order request has been sent! 🎂');
    setForm({ name: '', phone: '', email: '', occasion: '', date: '', message: '' });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-20 bg-cream text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-heading font-bold mb-6">Contact Us</h1>
          <p className="text-chocolate/70 text-lg max-w-2xl mx-auto">
            Have a question or want to place a custom order? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-heading font-bold mb-8">Get In Touch</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink/20 text-chocolate rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xl mb-1">Visit Us</h4>
                    <p className="text-chocolate/70">123 Bakery Street, Daman,<br/>India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink/20 text-chocolate rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xl mb-1">Call Us</h4>
                    <p className="text-chocolate/70">+91 9993550851<br/>+91 9993550851</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink/20 text-chocolate rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xl mb-1">Email Us</h4>
                    <p className="text-chocolate/70">hello@mrbakery.com<br/>orders@mrbakery.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink/20 text-chocolate rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xl mb-1">Opening Hours</h4>
                    <p className="text-chocolate/70">Monday – Sunday<br/>8:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <h2 className="text-3xl font-heading font-bold mb-6">FAQ</h2>
              <div className="space-y-4">
                {[
                  'Do you make custom cakes?',
                  'Do you provide home delivery?',
                  'Can I order online?',
                  'Do you make eggless cakes?',
                  'How early should I place a custom cake order?'
                ].map((q, i) => (
                  <details key={i} className="group bg-cream rounded-2xl p-4 cursor-pointer">
                    <summary className="font-heading font-semibold text-lg list-none flex justify-between items-center">
                      {q}
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-chocolate/70 mt-3 pl-2 border-l-2 border-gold">Yes, absolutely! Please contact us for more details.</p>
                  </details>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-cream p-8 md:p-12 rounded-3xl"
            >
              <h2 className="text-3xl font-heading font-bold mb-6">Reservation / Custom Order</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-chocolate mb-2">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-chocolate/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-chocolate mb-2">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-chocolate/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-chocolate mb-2">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-chocolate/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-chocolate mb-2">Cake Type / Occasion</label>
                    <input
                      type="text"
                      name="occasion"
                      value={form.occasion}
                      onChange={handleChange}
                      className="w-full bg-white border border-chocolate/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                      placeholder="Birthday Cake"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-chocolate mb-2">Delivery Date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full bg-white border border-chocolate/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-chocolate mb-2">Message & Details</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-chocolate/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    placeholder="Any specific requirements..."
                  />
                </div>

                <button type="submit" className="w-full bg-chocolate text-white rounded-full py-4 font-bold text-lg hover:bg-chocolate-light transition-colors shadow-lg shadow-chocolate/20">
                  Order Now
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 relative">
        <iframe
          title="Mr. Bakery Location"
          src="https://www.openstreetmap.org/export/embed.html?bbox=72.825%2C20.392%2C72.842%2C20.409&layer=mapnik&marker=20.4005%2C72.8335"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />
        <div className="absolute bottom-4 right-4">
          <a
            href="https://www.openstreetmap.org/?mlat=20.4005&mlon=72.8335#map=16/20.4005/72.8335"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-chocolate text-white text-sm px-4 py-2 rounded-full hover:bg-chocolate-light transition-colors shadow-md"
          >
            View Larger Map
          </a>
        </div>
      </section>
    </div>
  );
}
