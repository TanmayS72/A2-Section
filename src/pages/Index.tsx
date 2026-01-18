import { SyntheticHero } from "@/components/ui/synthetic-hero";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingCharacters } from "@/components/FloatingCharacters";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, Trophy, Heart, MessageCircle, BookOpen } from "lucide-react";

const quickStats = [
  { end: 60, suffix: "+", label: "Members", icon: "👥" },
  { end: 1, suffix: "", label: "Section Cup", icon: "🏆" },
  { end: 100, suffix: "+", label: "Mass Bunks", icon: "🎉" },
  { end: 365, suffix: "", label: "Days Together", icon: "💫" },
];

const pageLinks = [
  {
    title: "Our Journey",
    description: "From strangers to family - the complete timeline",
    icon: ArrowRight,
    path: "/journey",
    color: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/30",
  },
  {
    title: "Memory Wall",
    description: "Explore our 3D gallery of memories",
    icon: Heart,
    path: "/memories",
    color: "from-rose-500/20 to-rose-600/5",
    border: "border-rose-500/30",
  },
  {
    title: "Achievements",
    description: "What we accomplished together",
    icon: Trophy,
    path: "/achievements",
    color: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/30",
  },
  {
    title: "Voices of A2",
    description: "Hear from the people who lived it",
    icon: MessageCircle,
    path: "/voices",
    color: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/30",
  },
  {
    title: "Surprise Box",
    description: "Unbox hidden secrets & memories",
    icon: Sparkles,
    path: "/surprise",
    color: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/30",
    special: true,
  },
  {
    title: "Blog",
    description: "Stories, updates & announcements",
    icon: BookOpen,
    path: "/blog",
    color: "from-pink-500/20 to-pink-600/5",
    border: "border-pink-500/30",
  },
];

const Index = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <FloatingCharacters />

      {/* Hero Section */}
      <SyntheticHero
        badgeLabel="Section A2"
        badgeText="A Story"
        title="We didn't choose Section A2. It chose us."
        description="A random shuffle. Unknown faces. Different stories. One section. This is where strangers became family."
        ctaButtons={[
          { 
            text: "Explore Our Journey", 
            primary: true,
            href: "/journey"
          },
          { 
            text: "See Memories", 
            primary: false,
            href: "/memories"
          },
        ]}
        details={[
          "Formed by chance, bonded by choice",
          "From AMCAT shuffle to real memories",
          "Section Cup warriors",
        ]}
      />

      {/* Quick Stats Section */}
      <section className="relative py-24 bg-gradient-to-b from-background via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              A2 by the Numbers
            </h2>
            <p className="text-white/50">The stats that tell our story</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                duration={2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Explore Pages Section */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Explore Our Story
            </h2>
            <p className="text-white/50">Dive deeper into the A2 experience</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={link.path}
                  className={`group relative block p-6 rounded-2xl bg-gradient-to-br ${link.color} border ${link.border} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1`}
                >
                  {/* Special badge for surprise */}
                  {link.special && (
                    <div className="absolute top-4 right-4">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-amber-400"
                      >
                        <Sparkles size={20} />
                      </motion.div>
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <link.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-white mb-2">
                      {link.title}
                    </h3>
                    <p className="text-white/50 text-sm">{link.description}</p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaser Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center"
              >
                <Users size={40} className="text-primary" />
              </motion.div>
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
              This is just the beginning
            </h3>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Section A2's story is still being written. Every day adds a new chapter, 
              a new memory, a new reason to be proud of who we became.
            </p>
            <Link
              to="/journey"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-glow text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              Start the Journey
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;