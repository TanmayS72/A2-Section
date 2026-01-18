import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-background py-20 border-t border-white/5">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Quote */}
          <blockquote className="text-2xl md:text-4xl font-display font-bold text-white leading-relaxed">
            <span className="text-emerald-400">"</span>
            Section A2 didn't start strong — it became strong.
            <span className="text-emerald-400">"</span>
          </blockquote>

          {/* Divider */}
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mx-auto" />

          {/* Message */}
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            From random shuffle to real memories. This is Section A2's story — and it's still being written.
          </p>

          {/* Made with love */}
          <div className="flex items-center justify-center gap-2 text-sm text-white/40 pt-8">
            <span>Made with</span>
            <Heart size={16} className="text-red-400 fill-red-400" />
            <span>by Section A2</span>
          </div>

          {/* Year badge */}
          <div className="inline-block">
            <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
              Class of 2024-2025
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
