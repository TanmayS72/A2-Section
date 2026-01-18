import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingCharacters } from "@/components/FloatingCharacters";
import { UnboxingCard } from "@/components/UnboxingCard";
import { SectionTitle } from "@/components/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Star, PartyPopper } from "lucide-react";

const surpriseBoxes = [
  {
    id: "1",
    title: "Publish or Perish (Literally)",
    hiddenContent: "POV: You are in 2nd year and Ma'am expects a Nobel Prize level discovery , or else she deletes your existence from the attendance sheet. I guess I'm a scientist now.",
    emoji: "⚰️",
    color: "emerald" as const,
  },
  {
    id: "2",
    title: "The Secret Nickname",
    hiddenContent: "The faculty called us 'The Chaos Section' behind closed doors. Little did they know, we wore that title like a badge of honor.",
    emoji: "🎭",
    color: "amber" as const,
  },
  {
    id: "3",
    title: "The Unspoken Rule",
    hiddenContent: "Never. Rat. Out. A. Bunker. This became A2's golden rule. We protected each other's backs like it was a sacred duty.",
    emoji: "🤫",
    color: "violet" as const,
  },
  {
    id: "4",
    title: "The Hidden Talent",
    hiddenContent: "Turns out, A2 has secret singers, dancers, artists, and even a beatboxer. The Section Cup performances revealed talents nobody knew existed.",
    emoji: "⭐",
    color: "rose" as const,
  },
  {
    id: "5",
    title: "The Midnight Story",
    hiddenContent: "2:00 AM: 'Guys, what is the syllabus?' 4:00 AM: We have learned 6 months of Engineering in 2 hours. Result: We didn't just pass; we defeated the education system.",
    emoji: "🌙",
    color: "emerald" as const,
  },
  {
    id: "6",
    title: "The Food Memory",
    hiddenContent: "I think we single-handedly paid for the Canteen Uncle's new car. We didn't just eat there; we held our most important political discussions over a plate of maggi.",
    emoji: "💸",
    color: "amber" as const,
  },
  {
    id: "7",
    title: "The Promise",
    hiddenContent: "On the last day, someone said: 'Let's have a reunion every year, no matter where life takes us.' Everyone nodded. That promise still stands.",
    emoji: "🤝",
    color: "violet" as const,
  },
  {
    id: "8",
    title: "The Future Vision",
    hiddenContent: "In 10 years, imagine us at a reunion: some married, some CEOs, some travelers, but all still sending memes in the same old group chat. That's the A2 future we're building.",
    emoji: "🔮",
    color: "rose" as const,
  },
];

const easterEggs = [
  "🎉 You found a secret! A2 forever!",
  "✨ Hidden message: Best section!",
  "🏆 Easter egg found! Champions!",
  "💫 Secret unlocked: You're special!",
  "🌟 Hidden: Miss you all!",
];

const Surprise = () => {
  const [unlockedCards, setUnlockedCards] = useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);

  const handleUnlock = (cardId: string) => {
    if (unlockedCards.has(cardId)) return;
    
    setUnlockedCards(prev => {
      const newSet = new Set(prev);
      newSet.add(cardId);
      
      if (newSet.size === surpriseBoxes.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
      return newSet;
    });
  };

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <FloatingCharacters />

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: '50vw', 
                  y: '-10vh',
                  rotate: 0,
                  scale: 0
                }}
                animate={{ 
                  x: `${Math.random() * 100}vw`,
                  y: '110vh',
                  rotate: Math.random() * 720,
                  scale: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                }}
                className="absolute text-3xl"
              >
                {['🎉', '✨', '⭐', '💫', '🌟', '🎊', '💚'][i % 7]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-6xl mb-4"
            >
              🎁
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium"
            >
              <Sparkles size={16} />
              Hidden Treasures Await
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white">
              Surprise Box
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Unbox hidden secrets, untold stories, and surprise memories. 
              Tap each box to reveal what's inside!
            </p>

            {/* Progress */}
            <div className="pt-8">
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                <Gift size={20} className="text-primary" />
                <span className="text-white">
                  <span className="text-primary font-bold">{unlockedCards.size}</span>
                  <span className="text-white/50"> / {surpriseBoxes.length} unlocked</span>
                </span>
                {unlockedCards.size === surpriseBoxes.length && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-amber-400"
                  >
                    <Star size={20} className="fill-amber-400" />
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Surprise Boxes */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle
            title="Mystery Boxes"
            subtitle="Each box holds a secret piece of A2's story"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {surpriseBoxes.map((box, index) => (
              <UnboxingCard
                key={box.id}
                id={box.id}
                title={box.title}
                hiddenContent={box.hiddenContent}
                emoji={box.emoji}
                color={box.color}
                index={index}
                onUnlock={() => handleUnlock(box.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Easter Eggs Section */}
      <section className="py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <PartyPopper size={48} className="text-amber-400 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Hidden Easter Eggs
            </h2>
            <p className="text-white/50 text-lg">
              Scroll around the site carefully—there might be more secrets hidden!
            </p>
            
            {/* Floating easter egg hints */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {easterEggs.map((egg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/30 text-sm cursor-pointer hover:text-white hover:border-primary/30 transition-all"
                >
                  {egg}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Secret Message */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10"
          >
            <motion.div
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(16, 185, 129, 0)",
                  "0 0 20px rgba(16, 185, 129, 0.5)",
                  "0 0 20px rgba(16, 185, 129, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl md:text-3xl font-display font-bold text-white"
            >
              The real surprise isn't in the boxes—
              <br />
              <span className="text-primary">it's the memories we made along the way.</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Surprise;
