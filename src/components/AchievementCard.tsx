import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AchievementCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  color: 'emerald' | 'amber' | 'violet' | 'rose' | 'blue' | 'cyan';
  index: number;
}

const colorClasses = {
  emerald: {
    bg: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/30',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/30',
    icon: 'bg-amber-500/20 text-amber-400',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/20',
  },
  violet: {
    bg: 'from-violet-500/20 to-violet-600/5',
    border: 'border-violet-500/30',
    icon: 'bg-violet-500/20 text-violet-400',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/20',
  },
  rose: {
    bg: 'from-rose-500/20 to-rose-600/5',
    border: 'border-rose-500/30',
    icon: 'bg-rose-500/20 text-rose-400',
    text: 'text-rose-400',
    glow: 'shadow-rose-500/20',
  },
  blue: {
    bg: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/30',
    icon: 'bg-blue-500/20 text-blue-400',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/20',
  },
  cyan: {
    bg: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/30',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
};

export const AchievementCard = ({ icon: Icon, title, description, stat, color, index }: AchievementCardProps) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02, 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className={`relative group p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm overflow-hidden shadow-2xl ${colors.glow}`}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      {/* Floating particles */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div
          animate={{ y: [-5, 5], rotate: [0, 180] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          className="text-2xl"
        >
          ✨
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex p-3 rounded-xl ${colors.icon} mb-4`}>
          <Icon size={28} />
        </div>

        {/* Stat */}
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl font-display font-bold ${colors.text} mb-2`}
        >
          {stat}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-display font-semibold text-white mb-2">{title}</h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Corner accent */}
      <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${colors.bg} opacity-50 rounded-tl-full`} />
    </motion.div>
  );
};

export default AchievementCard;
