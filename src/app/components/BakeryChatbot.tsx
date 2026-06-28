import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['eggless', 'without egg', 'egg free'],
    answer: 'Yes! Absolutely. All our cakes can be prepared 100% eggless on request. Just specify your preference while ordering.',
  },
  {
    keywords: ['custom', 'design', 'birthday', 'wedding', 'anniversary'],
    answer: 'We craft beautiful custom designer cakes! For simple custom cakes, please order 24 hours in advance. For weddings and heavy designer cakes, we recommend 3-5 days in advance.',
  },
  {
    keywords: ['list', 'menu', 'items', 'options', 'cakes', 'bread', 'pastries'],
    answer: 'Here is our special collection: 🎂 Cakes: Chocolate Truffle, Red Velvet, Black Forest, Pineapple, Blueberry Cheesecake, Vanilla Caramel. 🥐 Pastries: Butter Croissant, Fruit Tarts, Chocolate Eclair. 🥖 Breads: Artisan Sourdough, French Baguette. 🍪 Cookies: Choco Chip, Butter Cookies. You can browse all items on our Menu page!',
  },
  {
    keywords: ['flavor', 'best', 'signature', 'tasty', 'popular'],
    answer: 'Our signatures are Chocolate Truffle, Red Velvet, and Blueberry Cheesecake. If you like fresh fruits, our Pineapple and Strawberry cakes are crowd favorites!',
  },
  {
    keywords: ['price', 'cost', 'expensive', 'rate'],
    answer: 'Our standard cakes start from $35. Pastries and cupcakes are between $3.5 to $6. You can check the complete pricing on our Menu page.',
  },
  {
    keywords: ['delivery', 'home delivery', 'ship', 'doorstep'],
    answer: 'Yes, we provide fresh doorstep delivery within Daman, India! Delivery is free for orders above $30.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'yo', 'greetings'],
    answer: 'Hello! I am your Sweet Assistant. How can I help you choose the perfect cake today?',
  },
];

const SUGGESTIONS = [
  'Do you make eggless cakes?',
  'Give me the list of cakes',
  'What are your best cake flavors?',
  'Do you deliver in Daman?',
];

export function BakeryChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hi there! 🎂 Welcome to Mr. Bakery. How can I help you sweeten your day today?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = "I'm not sure about that. Please contact us directly at hello@mrbakery.com or call us at +91 9993550851 for detailed assistance!";

      for (const item of KNOWLEDGE_BASE) {
        // Match using word boundaries to prevent 'yo' matching inside 'you'
        const matched = item.keywords.some((keyword) => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'i');
          return regex.test(lower);
        });

        if (matched) {
          replyText = item.answer;
          break;
        }
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: replyText }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-gold text-white p-4 rounded-full shadow-lg shadow-gold/30 hover:-translate-y-1 transition-transform flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 h-[500px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-chocolate/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-chocolate text-cream px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm leading-tight text-white">Sweet Assistant</h3>
                  <span className="text-[10px] text-cream/70">Online • Happy to Help</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-cream" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.sender === 'user'
                        ? 'bg-chocolate text-white rounded-tr-none'
                        : 'bg-cream text-chocolate border border-chocolate/5 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 bg-cream/30 border-t border-chocolate/5">
                {SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="text-xs bg-white border border-chocolate/10 text-chocolate px-2.5 py-1 rounded-full hover:border-gold hover:text-gold transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
                setInput('');
              }}
              className="p-4 border-t border-chocolate/10 flex gap-2 bg-white"
            >
              <input
                type="text"
                placeholder="Ask about eggless, custom cakes..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-cream border border-chocolate/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-chocolate text-white p-2.5 rounded-xl hover:bg-chocolate-light transition-colors flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
