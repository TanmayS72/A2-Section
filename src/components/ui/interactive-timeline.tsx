import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  category?: string;
  color?: string;
}

interface Timeline3DProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  showImages?: boolean;
  className?: string;
}

export const Timeline3D: React.FC<Timeline3DProps> = ({
  events,
  title = "Our Journey",
  subtitle = "From random shuffle to real memories",
  showImages = true,
  className = '',
}) => {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      setScrollDirection(st > lastScrollTop ? 'down' : 'up');
      setLastScrollTop(st <= 0 ? 0 : st);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen bg-background py-20 overflow-hidden ${className}`}
    >
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-20 ${i % 2 === 0 ? 'bg-emerald-500' : 'bg-emerald-700'}`}
            animate={{
              x: [`${20 + i * 10}%`, `${30 + i * 8}%`, `${20 + i * 10}%`],
              y: [`${10 + i * 12}%`, `${20 + i * 10}%`, `${30 + i * 8}%`, `${10 + i * 12}%`],
              scale: [1, 1.2, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{
              width: `${50 + i * 20}px`,
              height: `${50 + i * 20}px`,
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
        >
          <span className="gradient-text">{title}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-white/60 max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Central line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line hidden md:block" />

        {/* Events */}
        {events.map((event, index) => {
          const [ref, inView] = useInView({
            threshold: 0.3,
            triggerOnce: false,
          });
          const controls = useAnimation();
          
          useEffect(() => {
            if (inView) {
              controls.start('visible');
            }
          }, [controls, inView]);

          const isEven = index % 2 === 0;
          const eventColor = event.color || 'emerald';

          return (
            <motion.div
              key={event.id}
              ref={ref}
              className={`relative mb-16 md:mb-24 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} md:w-1/2 flex ${isEven ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'}`}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: {
                  opacity: 0,
                  x: isEven ? 50 : -50,
                  rotateY: isEven ? -10 : 10,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
            >
              {/* Timeline node - hidden on mobile */}
              <motion.div
                className={`absolute left-1/2 top-8 -translate-x-1/2 w-5 h-5 rounded-full bg-emerald-500 z-20 cursor-pointer hidden md:flex items-center justify-center timeline-node`}
                onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
                whileHover={{ scale: 1.3 }}
                animate={{
                  boxShadow: activeEvent === event.id
                    ? ['0 0 0 rgba(16, 185, 129, 0.5)', '0 0 20px rgba(16, 185, 129, 0.8)', '0 0 0 rgba(16, 185, 129, 0.5)']
                    : '0 0 0 rgba(16, 185, 129, 0)',
                }}
                transition={{ repeat: activeEvent === event.id ? Infinity : 0, duration: 1.5 }}
              >
                {event.icon || (
                  <span className="text-xs font-bold text-background">{index + 1}</span>
                )}
              </motion.div>

              {/* Card */}
              <motion.div
                className="relative glass rounded-2xl p-6 w-full max-w-md cursor-pointer group"
                onMouseEnter={() => setActiveEvent(event.id)}
                onMouseLeave={() => setActiveEvent(null)}
                whileHover={{ scale: 1.02 }}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `perspective(1000px) rotateY(${mousePosition.x * (isEven ? -3 : 3)}deg) rotateX(${mousePosition.y * -3}deg)`,
                }}
              >
                {/* Image */}
                {showImages && event.image && (
                  <div className="relative mb-4 overflow-hidden rounded-xl aspect-video">
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-400 font-medium">{event.date}</span>
                    {event.category && (
                      <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">
                        {event.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {event.title}
                  </h3>

                  <AnimatePresence>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: activeEvent === event.id ? 'auto' : 0, opacity: activeEvent === event.id ? 1 : 0 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/70 text-sm leading-relaxed pt-2">
                        {event.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Always show truncated description on mobile */}
                  <p className="text-white/70 text-sm leading-relaxed md:hidden line-clamp-2">
                    {event.description}
                  </p>
                </div>

                {/* Animated bottom border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-emerald-500 rounded-b-2xl"
                  initial={{ width: '0%' }}
                  animate={{ width: activeEvent === event.id ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-2xl" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline3D;
