import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface VoiceCardProps {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  index: number;
}

export const VoiceCard = ({ name, role, quote, avatar, index }: VoiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden">
        {/* Quote icon */}
        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
          <Quote size={48} className="text-primary" />
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary-glow/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Quote */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 italic">
            "{quote}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatar}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
              >
                <span className="text-xs">💚</span>
              </motion.div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">{name}</h4>
              <p className="text-primary/80 text-sm">{role}</p>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-primary opacity-50" />
      </div>
    </motion.div>
  );
};

export default VoiceCard;
