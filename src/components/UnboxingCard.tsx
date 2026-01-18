import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Lock } from 'lucide-react';

interface UnboxingCardProps {
  id: string;
  title: string;
  hiddenContent: string;
  emoji: string;
  color: 'emerald' | 'amber' | 'violet' | 'rose';
  index: number;
  onUnlock?: () => void;
}

const colorClasses = {
  emerald: {
    bg: 'from-emerald-500 to-emerald-700',
    glow: 'shadow-emerald-500/50',
    border: 'border-emerald-400',
  },
  amber: {
    bg: 'from-amber-500 to-amber-700',
    glow: 'shadow-amber-500/50',
    border: 'border-amber-400',
  },
  violet: {
    bg: 'from-violet-500 to-violet-700',
    glow: 'shadow-violet-500/50',
    border: 'border-violet-400',
  },
  rose: {
    bg: 'from-rose-500 to-rose-700',
    glow: 'shadow-rose-500/50',
    border: 'border-rose-400',
  },
};

export const UnboxingCard = ({ title, hiddenContent, emoji, color, index, onUnlock }: UnboxingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorClasses[color];

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      onUnlock?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative perspective-1000"
    >
      <motion.div
        animate={isHovered && !isOpen ? { 
          rotateY: [0, -5, 5, 0],
          scale: 1.02
        } : {}}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Box closed state */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              exit={{ 
                rotateX: -90, 
                opacity: 0,
                transition: { duration: 0.5 }
              }}
              onClick={handleOpen}
              className={`relative cursor-pointer p-8 rounded-2xl bg-gradient-to-br ${colors.bg} shadow-2xl ${colors.glow} overflow-hidden transform-gpu`}
            >
              {/* Shine effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />

              {/* Lock icon */}
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock size={20} className="text-white/50" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  <Gift size={64} className="text-white mx-auto" />
                </motion.div>
                <h3 className="text-xl font-display font-bold text-white mb-2">{title}</h3>
                <p className="text-white/70 text-sm flex items-center justify-center gap-2">
                  <Sparkles size={14} />
                  Tap to reveal
                  <Sparkles size={14} />
                </p>
              </div>

              {/* Ribbon */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full">
                <div className="w-full h-full bg-white/20 backdrop-blur-sm" />
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8">
                <div className="w-full h-full bg-white/20 backdrop-blur-sm" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ 
                rotateX: 90, 
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                rotateX: 0, 
                opacity: 1,
                scale: 1
              }}
              transition={{ 
                duration: 0.6,
                type: 'spring',
                stiffness: 200
              }}
              className={`relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] border ${colors.border} backdrop-blur-sm overflow-hidden`}
            >
              {/* Confetti particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: '50%', 
                    y: '50%', 
                    scale: 0 
                  }}
                  animate={{ 
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.05,
                  }}
                  className="absolute text-2xl pointer-events-none"
                >
                  {['🎉', '✨', '⭐', '💫', '🌟', '🎊'][i % 6]}
                </motion.div>
              ))}

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  {emoji}
                </motion.div>
                <h3 className="text-xl font-display font-bold text-white mb-4">{title}</h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/80 text-base leading-relaxed"
                >
                  {hiddenContent}
                </motion.p>
              </div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-sm"
              >
                Close
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default UnboxingCard;
