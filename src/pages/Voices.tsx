import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingCharacters } from "@/components/FloatingCharacters";
import { VoiceCard } from "@/components/VoiceCard";
import { SectionTitle } from "@/components/SectionTitle";
import { motion } from "framer-motion";
import { MessageCircle, Mic, Heart } from "lucide-react";
const voices = [
  {
    name: "Keshav Chaturvedi",
    role: "Class Representative (CR)",
    quote: "Being CR of A2 wasn't just a responsibility—it was an honor. This section taught me that leadership isn't about authority, it's about belonging.",
    avatar: "/gallery/keshav.jpeg",
  },
  {
    name: "Harshita Agrawal",
    role: "Lady Representative (LR)",
    quote: "I've been in other teams before, but A2 was different. We didn't compete to win—we competed because we wanted to do it together.",
    avatar: "/gallery/harshita.jpeg",
  },
  {
    name: "Gaurang Shendre",
    role: "CEO of Brainrot",
    quote: "The 3 AM GC > Therapy. 💀 A2 matches my freak fr. My sleep schedule is cooked but the vibes are immaculate. Real ones only.",
    avatar: "/gallery/gaurang.png",
  },
  {
    name: "Akhil Balaji",
    role: "The 4K Sniper 📸",
    quote: "Caught you in 4K. 📸 Events were just side quests, the chaos we caused was the main plot. Absolute cinema. 🎥",
    avatar: "/gallery/balaji.png",
  },
  {
    name: "Mayank Dhapodkar",
    role: "Lowkey Legend 🤫",
    quote: "I usually move in silence, but A2 adopted me fr. No masking needed, they just passed the vibe check. W section. 🤝",
    avatar: "/gallery/mayank.png",
  },
  {
    name: "Soham Adgokar",
    role: "Notes Queen 💅",
    quote: "Carrying the whole section's GPA on my back. 🏋️‍♂️ I drop the PDFs and suddenly I'm the main character. Call me the cheat code. GG EZ. 📚",
    avatar: "/gallery/soham.png",
  },
  {
    name: "Kedar Singh",
    role: "Gym Class Hero 🏅",
    quote: "Scoreboard said L, but the vibes were a massive W. 📉 A2 hype squad made us feel like HIM even when we were getting cooked. We didn't lose, we just deferred the win. 🏆",
    avatar: "/gallery/kedar.png",
  },
  {
    name: "Piyush Dhanuka",
    role: "Chief Chaos Officer 🎨",
    quote: "My ideas are pure fever dreams. 📉 Other sections were acting like NPCs saying 'too much', but A2 said 'HOL UP, LET HIM COOK.' 👨‍🍳🔥 Found the only squad that matches my energy. W.",
    avatar: "/gallery/piyush.png",
  },
];

const quickQuotes = [
  { quote: "AMCAT did something right for once 😂", author: "Anonymous" },
  { quote: "Miss those canteen breaks already", author: "Half the section" },
  { quote: "Best section, no debate needed", author: "Everyone" },
  { quote: "From strangers to family speedrun", author: "The whole gang" },
  { quote: "Would do it all over again", author: "All of us" },
];

const Voices = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <FloatingCharacters />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium"
            >
              <Mic size={16} />
              Real Stories, Real People
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white">
              Voices of A2
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Hear from the people who lived it. Unfiltered thoughts, 
              honest reflections, and lots of love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Voices */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle
            title="Featured Voices"
            subtitle="Stories from the heart of Section A2"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {voices.map((voice, index) => (
              <VoiceCard
                key={index}
                name={voice.name}
                role={voice.role}
                quote={voice.quote}
                avatar={voice.avatar}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Quotes Ticker */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <MessageCircle className="text-primary" size={24} />
            <h3 className="text-xl font-display font-semibold text-white">Quick Takes</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {quickQuotes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <p className="text-white/80 text-sm">
                  "{item.quote}" <span className="text-primary">— {item.author}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Heart size={48} className="text-rose-400 fill-rose-400" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Your Voice Matters Too
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Have a story about A2 you want to share? A memory that still makes you smile? 
              Every voice adds to our collective story.
            </p>
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm">
              Share your story in the section group 💚
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Voices;
