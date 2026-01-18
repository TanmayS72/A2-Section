import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}

const emojis = ['📚', '🎓', '🎉', '✨', '💫', '🌟', '🎭', '🏆', '🎪', '💪', '🔥', '⚡'];

export const FloatingCharacters = () => {
  const [characters, setCharacters] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const generated: FloatingEmoji[] = [];
    for (let i = 0; i < 12; i++) {
      generated.push({
        id: i,
        emoji: emojis[i % emojis.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.8 + Math.random() * 0.6,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 5,
      });
    }
    setCharacters(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {characters.map((char) => (
        <motion.div
          key={char.id}
          initial={{ 
            x: `${char.x}vw`, 
            y: '110vh',
            opacity: 0,
            scale: char.scale 
          }}
          animate={{ 
            y: '-10vh',
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: char.duration,
            delay: char.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute text-4xl"
          style={{ left: `${char.x}%` }}
        >
          {char.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCharacters;
