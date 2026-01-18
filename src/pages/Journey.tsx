import { ParallaxScrollSection } from "@/components/ui/parallax-scroll-section";
import { Timeline3D, TimelineEvent } from "@/components/ui/interactive-timeline";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingCharacters } from "@/components/FloatingCharacters";
import { motion, useAnimationControls } from "framer-motion";

import { ArrowDown } from "lucide-react";

import { useEffect, useState } from "react";

// Timeline events for Section A2's journey
const timelineEvents: TimelineEvent[] = [
  {
    id: "before-a2",
    date: "Before A2",
    title: "The Canon Event",
    description: "We were just NPCs in different sections. Little did we know the timeline was about to break. It was a canon event; it could not be prevented.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
    category: "Origin",
    color: "slate"
  },
  {
    id: "amcat-shuffle",
    date: "The Shuffle",
    title: "AMCAT Changed Everything",
    description: "One assessment. One random algorithm. And suddenly, 60+ people who never talked were thrown into the same room. Section A2 was born.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop",
    category: "Turning Point",
    color: "amber"
  },
  {
    id: "first-days",
    date: "Week 1",
    title: "The Awkward Phase",
    description: "New faces everywhere. Sitting alone. Wondering if we'd ever actually talk to each other. The silence was... loud.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop",
    category: "Beginning",
    color: "blue"
  },
  {
    id: "whatsapp-chaos",
    date: "Week 2-3",
    title: "WhatsApp Group Chaos",
    description: "Someone created the group. Then came the memes. The random messages at 3 AM. The 'who has notes?' texts. We were finally talking.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
    category: "Connection",
    color: "green"
  },
  {
    id: "section-cup",
    date: "Month 2",
    title: "Section Cup Warriors",
    description: "We weren't just a section anymore—we were a team. Every event, every competition, we showed up. Win or lose, A2 was loud.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop",
    category: "Unity",
    color: "emerald"
  },
  {
    id: "mass-bunks",
    date: "Ongoing",
    title: "Mass Bunks & Canteen Runs",
    description: "The unspoken agreement. When one of us bunks, we all bunk. The canteen became our second classroom—where real bonding happened.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop",
    category: "Traditions",
    color: "pink"
  },
  {
    id: "present-day",
    date: "Today",
    title: "Accomplices in Chaos",
    description: "From strangers to co-conspirators. We've officially reached the 'we can communicate with just eye contact' level of friendship. 10/10 would suffer through this semester with you again.",
    image: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&auto=format&fit=crop",
    category: "Present",
    color: "violet"
  },
];

// Parallax sections
const parallaxSections = [
  {
    id: 1,
    title: "New Faces, Uncertain Beginnings",
    description: "The AMCAT shuffle threw us together—strangers from different sections, different stories. We didn't know each other's names yet, but something was beginning.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
    reverse: false
  },
  {
    id: 2,
    title: "Finding Our Rhythm",
    description: "The first WhatsApp group. The first inside jokes. The first time we realized this might actually work. Chaos was turning into chemistry.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
    reverse: true
  },
  {
    id: 3,
    title: "Bonding Beyond Classes",
    description: "Mass bunks became traditions. Canteen runs became rituals. We weren't just classmates anymore—we were becoming A2.",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop",
    reverse: false
  },
];

// Smoke puff component for reusability
const SmokePuff = ({ 
  size, 
  delay, 
  duration, 
  xDrift, 
  yTravel, 
  opacity,
  left 
}: { 
  size: number; 
  delay: number; 
  duration: number; 
  xDrift: number; 
  yTravel: number;
  opacity: number;
  left: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-gray-300/50 blur-md"
    style={{ 
      width: size, 
      height: size, 
      top: -size - 20,
      left: left,
    }}
    animate={{ 
      y: [0, -yTravel],
      x: [0, -xDrift],
      opacity: [opacity, 0],
      scale: [0.3, 2.5]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      ease: "easeOut",
      delay 
    }}
  />
);

// Steam whistle burst component
const SteamWhistle = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;
  
  return (
    <div className="absolute -top-16 left-6">
      {/* Main whistle steam bursts */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/60 blur-sm"
          style={{
            width: 8 + i * 2,
            height: 8 + i * 2,
          }}
          initial={{ scale: 0, opacity: 0, y: 0, x: 0 }}
          animate={{ 
            scale: [0, 1.5, 2],
            opacity: [0.8, 0.4, 0],
            y: [-5, -30 - i * 10],
            x: [-5 - i * 3, -20 - i * 8],
          }}
          transition={{ 
            duration: 0.8,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Whistle sound waves visualization */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute -top-4 left-2 w-4 h-4 border-2 border-white/40 rounded-full"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 2 + i],
            opacity: [0.6, 0],
          }}
          transition={{ 
            duration: 0.6,
            delay: 0.2 + i * 0.15,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const TrainCar = ({ 
  delay, 
  variant, 
  showWhistle = false 
}: { 
  delay: number; 
  variant: "locomotive" | "passenger" | "cargo";
  showWhistle?: boolean;
}) => {
  const colors = {
    locomotive: {
      body: "from-emerald-500 to-emerald-600",
      accent: "bg-emerald-400",
      window: "bg-yellow-300",
    },
    passenger: {
      body: "from-blue-500 to-blue-600", 
      accent: "bg-blue-400",
      window: "bg-cyan-200/80",
    },
    cargo: {
      body: "from-amber-500 to-amber-600",
      accent: "bg-amber-400", 
      window: "bg-amber-300/50",
    },
  };

  const color = colors[variant];

  // Smoke puff configurations for more variety
  const smokePuffs = [
    { size: 24, delay: 0, duration: 1.2, xDrift: 25, yTravel: 50, opacity: 0.7, left: 8 },
    { size: 18, delay: 0.2, duration: 1.0, xDrift: 20, yTravel: 40, opacity: 0.6, left: 12 },
    { size: 30, delay: 0.4, duration: 1.5, xDrift: 35, yTravel: 60, opacity: 0.5, left: 6 },
    { size: 14, delay: 0.6, duration: 0.9, xDrift: 18, yTravel: 35, opacity: 0.6, left: 14 },
    { size: 22, delay: 0.8, duration: 1.3, xDrift: 28, yTravel: 55, opacity: 0.55, left: 10 },
    { size: 16, delay: 1.0, duration: 1.1, xDrift: 22, yTravel: 45, opacity: 0.5, left: 8 },
    { size: 28, delay: 0.3, duration: 1.4, xDrift: 32, yTravel: 58, opacity: 0.45, left: 4 },
    { size: 12, delay: 0.5, duration: 0.8, xDrift: 15, yTravel: 30, opacity: 0.7, left: 16 },
  ];

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-1, 1, -1] }}
      transition={{ duration: 0.3, repeat: Infinity, delay }}
      className="relative flex-shrink-0"
    >
      {/* Train Car Body */}
      <div className={`relative w-24 h-14 rounded-lg bg-gradient-to-b ${color.body} shadow-lg`}>
        {/* Roof */}
        <div className={`absolute -top-2 left-2 right-2 h-3 rounded-t-lg ${color.accent}`} />
        
        {/* Windows */}
        <div className="absolute top-3 left-2 right-2 flex gap-1.5 justify-center">
          {variant === "locomotive" ? (
            <div className={`w-8 h-5 rounded ${color.window} shadow-inner`} />
          ) : variant === "passenger" ? (
            <>
              <div className={`w-5 h-4 rounded-sm ${color.window}`} />
              <div className={`w-5 h-4 rounded-sm ${color.window}`} />
              <div className={`w-5 h-4 rounded-sm ${color.window}`} />
            </>
          ) : (
            <div className={`w-16 h-6 rounded ${color.window} border-2 border-amber-600/50`} />
          )}
        </div>

        {/* Door/Details */}
        {variant === "passenger" && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-5 bg-blue-700 rounded-t" />
        )}

        {/* Locomotive front - on the RIGHT side (train moves left to right) */}
        {variant === "locomotive" && (
          <>
            <div className="absolute -right-3 top-4 w-4 h-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-r-lg" />
            {/* Headlight with glow */}
            <motion.div
              className="absolute -right-1 top-1 w-3 h-3 rounded-full bg-yellow-300"
              animate={{ 
                boxShadow: [
                  "0 0 10px 3px rgba(255,255,0,0.4), 0 0 30px 8px rgba(255,255,0,0.2)", 
                  "0 0 20px 6px rgba(255,255,0,0.7), 0 0 50px 15px rgba(255,255,0,0.3)", 
                  "0 0 10px 3px rgba(255,255,0,0.4), 0 0 30px 8px rgba(255,255,0,0.2)"
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            {/* Light beam */}
            <motion.div
              className="absolute -right-4 top-0 w-16 h-8 opacity-20"
              style={{
                background: "linear-gradient(90deg, rgba(255,255,0,0.4) 0%, transparent 100%)",
                clipPath: "polygon(0 30%, 100% 0%, 100% 100%, 0 70%)",
              }}
              animate={{ opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {/* Chimney */}
            <div className="absolute -top-6 left-4 w-5 h-5 bg-gray-700 rounded-t-lg border-t-2 border-gray-500" />
            
            {/* Steam whistle animation */}
            <SteamWhistle isActive={showWhistle} />
            
            {/* Multiple smoke puffs with varying sizes */}
            {smokePuffs.map((puff, index) => (
              <SmokePuff key={index} {...puff} />
            ))}
          </>
        )}

        {/* Bottom rail */}
        <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gray-800 rounded" />
      </div>

      {/* Wheels */}
      <div className="absolute -bottom-3 left-2 flex gap-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 rounded-full bg-gray-700 border-2 border-gray-500 flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 rounded-full bg-gray-700 border-2 border-gray-500 flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
        </motion.div>
      </div>

      {/* Connector on left side (cars follow locomotive to the right) */}
      {variant !== "locomotive" && (
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-4 h-2 bg-gray-600 rounded" />
      )}
    </motion.div>
  );
};

const Track = () => (
  <div className="relative w-full">
    {/* Main rails */}
    <div className="flex flex-col gap-7">
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent rounded-full" />
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent rounded-full" />
    </div>
    {/* Sleepers */}
    <div className="absolute top-0 left-0 right-0 flex justify-between px-4" style={{ top: '3px' }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="w-2 h-6 bg-amber-900/60 rounded-sm" />
      ))}
    </div>
  </div>
);

export const AnimatedTrain = () => {
  const controls = useAnimationControls();
  const [showWhistle, setShowWhistle] = useState(false);

  useEffect(() => {
    const animate = async () => {
      // Show whistle when train first appears
      setShowWhistle(true);
      setTimeout(() => setShowWhistle(false), 1500);
      
      await controls.start({
        x: [-600, 2000],
        transition: {
          duration: 12,
          ease: "linear",
          repeat: Infinity,
        }
      });
    };
    animate();
    
    // Repeat whistle on each loop
    const whistleInterval = setInterval(() => {
      setShowWhistle(true);
      setTimeout(() => setShowWhistle(false), 1500);
    }, 12000);
    
    return () => clearInterval(whistleInterval);
  }, [controls]);

  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Scenic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mountains silhouette */}
        <svg className="absolute bottom-12 left-0 w-full h-32 opacity-20" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,200 L100,100 L200,150 L350,50 L450,120 L550,80 L700,140 L850,40 L950,100 L1100,60 L1200,120 L1200,200 Z" fill="currentColor" className="text-emerald-500" />
        </svg>
        
        {/* Stars/particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Track */}
      <div className="absolute bottom-8 left-0 right-0">
        <Track />
      </div>

      {/* Moving Train - starts from LEFT, moves RIGHT */}
      <motion.div
        animate={controls}
        className="flex items-end gap-1 absolute bottom-12 left-0"
      >
        {/* Locomotive at front (rightmost), followed by cars */}
        <TrainCar delay={0.2} variant="passenger" />
        <TrainCar delay={0.15} variant="cargo" />
        <TrainCar delay={0.1} variant="passenger" />
        <TrainCar delay={0.05} variant="passenger" />
        <TrainCar delay={0} variant="locomotive" showWhistle={showWhistle} />
      </motion.div>

      {/* Ground decoration */}
      <div className="absolute bottom-4 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent" />

      {/* Station hint on the left */}
      <div className="absolute bottom-10 left-8 opacity-40">
        <div className="w-8 h-16 bg-gray-700 rounded-t-lg" />
        <div className="w-12 h-2 bg-gray-600 -ml-2" />
      </div>

      {/* Station hint on the right */}
      <div className="absolute bottom-10 right-8 opacity-40">
        <div className="w-8 h-16 bg-gray-700 rounded-t-lg" />
        <div className="w-12 h-2 bg-gray-600 -ml-2" />
      </div>
    </div>
  );
};

const Journey = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <FloatingCharacters />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
            >
              📖 The Complete Story
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-8xl font-display font-bold"
            >
              <span className="text-white">Our </span>
              <span className="gradient-text">Journey</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
              From scattered strangers to an unbreakable family. 
              Scroll through the moments that defined Section A2.
            </motion.p>
          </motion.div>
        </div>

        {/* Train Animation Section */}
        <AnimatedTrain />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-1 flex flex-col items-center gap-3"
        >
          <motion.span 
            className="text-xs text-white/40 uppercase tracking-[0.2em]"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Start the journey
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Parallax Scroll Section */}
      <ParallaxScrollSection
        title="From Strangers to Section"
        subtitle="The journey of how random became real"
        sections={parallaxSections}
      />

      {/* 3D Interactive Timeline */}
      <Timeline3D
        events={timelineEvents}
        title="The Timeline"
        subtitle="Every moment that shaped us"
        showImages={true}
      />

      <Footer />
    </main>
  );
};

export default Journey;