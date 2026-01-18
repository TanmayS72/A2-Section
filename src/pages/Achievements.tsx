import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingCharacters } from "@/components/FloatingCharacters";
import { AchievementCard } from "@/components/AchievementCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionTitle } from "@/components/SectionTitle";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Users, 
  Calendar, 
  Coffee, 
  Laugh, 
  Heart,
  Star,
  Zap,
  Target,
  Medal,
  Crown,
  Flame
} from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Section Cup Champions",
    description: "Competed in every event with heart. We didn't always win, but we always showed up loud.",
    stat: "1st",
    color: "amber" as const,
  },
  {
    icon: Users,
    title: "60+ Strong",
    description: "From strangers to family. Every single member added something unique to A2.",
    stat: "60+",
    color: "emerald" as const,
  },
  {
    icon: Calendar,
    title: "Days of Togetherness",
    description: "165 days of chaos, laughter, and unforgettable memories.",
    stat: "165",
    color: "blue" as const,
  },
  {
    icon: Coffee,
    title: "Canteen Visits",
    description: "The canteen knew us by name. Our second home, our planning headquarters.",
    stat: "200+",
    color: "rose" as const,
  },
  {
    icon: Laugh,
    title: "Inside Jokes",
    description: "Jokes that only A2 gets. References that'll last a lifetime.",
    stat: "∞",
    color: "violet" as const,
  },
  {
    icon: Heart,
    title: "Friendships Made",
    description: "Bonds that started in the classroom but will last far beyond graduation.",
    stat: "100+",
    color: "cyan" as const,
  },
];

const milestones = [
  {
    icon: Star,
    title: "First Mass Bunk",
    description: "One person said 'bunk?' and we all understood the assignment. 🤝 Pulled a collective Houdini. Attendance: 0, Vibes: 100.",
  },
  {
    icon: Zap,
    title: "WhatsApp Group Created",
    description: "Official Yap Session HQ. 🗣️ 99% brainrot, 1% notes. The notification count is literally my villain origin story.",
  },
  {
    icon: Target,
    title: "Section Cup Entry",
    description: "Pulled up with 0 prep and pure delusion. We were absolutely cooked but we ball. 💀",
  },
  {
    icon: Medal,
    title: "Cultural Event Win",
    description: "Ate and left no crumbs. 💅 The crowd went stonks and the opps were shook. Absolute cinema.",
  },
  {
    icon: Crown,
    title: "Best Section Award",
    description: "Official confirmation that we are HIM. Literally built different. G.O.A.T. status secured. 🐐",
  },
  {
    icon: Flame,
    title: "Farewell Night",
    description: "Emotional damage: 100. Crying in the club rn. Core memory unlocked. 🔓 (Send drive link pls).",
  },
];

const bigStats = [
  { end: 60, suffix: "+", label: "Members", icon: "👥" },
  { end: 1, suffix: "", label: "Section Cup Win", icon: "🏆" },
  { end: 100, suffix: "+", label: "Mass Bunks", icon: "🎉" },
  { end: 10, suffix: "K+", label: "WhatsApp Messages", icon: "💬" },
];

const Achievements = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <FloatingCharacters />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block text-6xl mb-4"
            >
              🏆
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white">
              Achievements
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              What we accomplished together. Every win, every milestone, 
              every moment that made us proud to be A2.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Big Stats */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {bigStats.map((stat, index) => (
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

      {/* Achievement Cards */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle
            title="Our Wins"
            subtitle="Numbers don't lie. Here's what A2 achieved together."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                icon={achievement.icon}
                title={achievement.title}
                description={achievement.description}
                stat={achievement.stat}
                color={achievement.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto px-6">
          <SectionTitle
            title="Key Milestones"
            subtitle="The moments that defined our journey"
          />
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`flex items-start gap-6 ${index % 2 === 1 ? 'flex-row-reverse text-right' : ''}`}>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/20 border border-primary/30 flex items-center justify-center"
                  >
                    <milestone.icon size={28} className="text-primary" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-white/50">{milestone.description}</p>
                  </div>
                </div>

                {/* Connector line */}
                {index < milestones.length - 1 && (
                  <div className={`h-8 w-px bg-gradient-to-b from-primary/30 to-transparent my-4 ${index % 2 === 0 ? 'ml-8' : 'mr-8 ml-auto'}`} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Achievements;
