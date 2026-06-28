import { motion } from 'motion/react';
import { Award, Users, Cake, Star, Heart, ShieldCheck, ChefHat, Target } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const stats = [
  { icon: Award, label: 'Years Experience', value: '15+' },
  { icon: Users, label: 'Happy Customers', value: '20,000+' },
  { icon: Cake, label: 'Bakery Products', value: '100+' },
  { icon: Star, label: 'Star Rating', value: '4.9' },
];

const values = [
  { icon: Target, title: 'Our Mission', desc: 'To bring joy to every table through artisan baked goods made with passion, premium ingredients, and an unwavering commitment to quality and freshness.' },
  { icon: Heart, title: 'Our Vision', desc: 'To be the most loved bakery brand — a place where every bite feels like home and every celebration is made sweeter by our creations.' },
  { icon: ShieldCheck, title: 'Hygiene Standards', desc: 'Our kitchen follows strict food-safety protocols. Everything is baked in a FSSAI-certified, hygienically maintained environment every single day.' },
];

const team = [
  { name: 'Chef Arjun Mehta', role: 'Master Baker & Founder', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&q=80', bio: '15+ years of experience crafting artisan breads and celebration cakes across India and Europe.' },
  { name: 'Chef Nisha Kapoor', role: 'Head Pastry Chef', image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80', bio: 'Trained in French patisserie with a passion for delicate pastries and custom cake artistry.' },
  { name: 'Chef Rohan Das', role: 'Bread & Specialty Baker', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80', bio: 'Specialist in sourdough and artisan breads using traditional slow-fermentation techniques.' },
];

const awards = [
  { year: '2023', title: 'Best Artisan Bakery — Food & Hospitality Awards' },
  { year: '2022', title: 'Top Rated Bakery — Zomato Gold' },
  { year: '2021', title: 'Excellence in Quality — National Bakers Guild' },
  { year: '2019', title: 'Most Loved Local Bakery — City Food Awards' },
];

export function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">Our Story</h1>
          <p className="text-lg text-chocolate/70 max-w-2xl mx-auto">
            Baking memories since 2008. We believe that every celebration deserves a touch of sweetness crafted with passion and the finest ingredients.
          </p>
        </div>
      </section>

      {/* Story & Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1549590143-d5855148a9d5?w=800&q=80"
                  alt="Baking Process"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-pink rounded-full z-0" />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gold/20 rounded-full z-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-heading font-bold mb-6">The Mr. Bakery Journey</h2>
              <p className="text-chocolate/80 mb-6 text-lg leading-relaxed">
                What started as a small family kitchen adventure has blossomed into Sweet City's most beloved artisan bakery. Our founder, driven by a passion for traditional baking methods, set out to create a place where every bite feels like home.
              </p>
              <p className="text-chocolate/80 mb-8 text-lg leading-relaxed">
                We take pride in our slow-fermentation breads, our intricate pastry layering, and our custom celebration cakes that act as the centerpiece for your most cherished moments. No shortcuts, just pure, honest baking.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold mb-1">Premium Ingredients</h4>
                    <p className="text-chocolate/70">Sourced from local organic farms and finest global suppliers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shrink-0">
                    <Cake className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-bold mb-1">Freshly Baked Daily</h4>
                    <p className="text-chocolate/70">Our ovens start at 3 AM to ensure the freshest pastries for your morning.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-chocolate text-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-heading font-bold mb-2 text-white">{stat.value}</h3>
                <p className="text-cream/70 uppercase tracking-wider text-sm font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Hygiene */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-chocolate/5 text-center"
              >
                <div className="w-16 h-16 bg-pink/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <v.icon className="w-8 h-8 text-chocolate" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{v.title}</h3>
                <p className="text-chocolate/70 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Meet Our Master Bakers</h2>
            <p className="text-chocolate/70 text-lg">The talented hands behind every delicious creation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-cream rounded-3xl overflow-hidden group text-center"
              >
                <div className="h-64 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                  <p className="text-gold font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-chocolate/70 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-chocolate-dark text-cream">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 text-white">Awards & Achievements</h2>
            <p className="text-cream/70">Recognized for excellence in quality, taste, and service.</p>
          </div>
          <div className="space-y-4">
            {awards.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5"
              >
                <span className="text-gold font-heading font-bold text-xl shrink-0">{a.year}</span>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gold shrink-0" />
                  <p className="text-white font-medium">{a.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
