'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ParallaxSection {
  id: number
  title: string
  description: string
  imageUrl: string
  reverse: boolean
}

interface ParallaxScrollSectionProps {
  title?: string
  subtitle?: string
  sections?: ParallaxSection[]
  className?: string
}

const defaultSections: ParallaxSection[] = [
  {
    id: 1,
    title: "New Faces, Uncertain Beginnings",
    description: "The AMCAT shuffle threw us together—strangers from different sections, different stories. We didn't know each other's names yet, but something was beginning.",
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop',
    reverse: false
  },
  {
    id: 2,
    title: "Finding Our Rhythm",
    description: "The first WhatsApp group. The first inside jokes. The first time we realized this might actually work. Chaos was turning into chemistry.",
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop',
    reverse: true
  },
  {
    id: 3,
    title: "Bonding Beyond Classes",
    description: "Mass bunks became traditions. Canteen runs became rituals. We weren't just classmates anymore—we were becoming A2.",
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop',
    reverse: false
  },
]

export const ParallaxScrollSection = ({
  title = "From Strangers to Section",
  subtitle = "The journey of how random became real",
  sections = defaultSections,
  className
}: ParallaxScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Create transforms for each section
  const translateContents = sections.map((_, index) => {
    const start = index / sections.length
    const end = (index + 1) / sections.length
    return useTransform(scrollYProgress, [start, end], [50, -50])
  })

  const opacityContents = sections.map((_, index) => {
    const start = index / sections.length
    const mid = (index + 0.4) / sections.length // Slower fade in
    const end = (index + 0.85) / sections.length // Stays visible longer
    const finish = (index + 1.1) / sections.length // Slower fade out
    return useTransform(
      scrollYProgress,
      [start, mid, end, finish],
      [0, 1, 1, 0]
    )
  })

  const clipProgresses = sections.map((_, index) => {
    const start = index / sections.length
    const end = (index + 1.2) / sections.length // Slowed down - takes longer to fully reveal
    return useTransform(
      scrollYProgress,
      [start, end],
      ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
    )
  })

  return (
    <section
      ref={containerRef}
      className={cn("relative bg-background", className)}
      style={{ height: `${(sections.length + 1.5) * 100}vh` }} // More scroll distance for slower effect
    >
      {/* Header */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center px-6 mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 gradient-text">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-20 flex flex-col items-center gap-3"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} className="text-emerald-400" />
        </motion.div>
      </div>

      {/* Parallax Sections */}
      {sections.map((section, index) => (
        <div
          key={section.id}
          className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        >
          <div className={cn(
            "relative w-full max-w-7xl mx-auto px-6 grid gap-8 items-center",
            section.reverse
              ? "md:grid-cols-[1fr_1.2fr]"
              : "md:grid-cols-[1.2fr_1fr]"
          )}>
            {/* Text Content */}
            <motion.div
              className={cn(
                "z-20 space-y-6",
                section.reverse && "md:order-2"
              )}
              style={{ y: translateContents[index] }}
            >
              <motion.span
                className="inline-block text-emerald-400 text-sm uppercase tracking-widest font-medium"
                style={{ opacity: opacityContents[index] }}
              >
                Chapter {section.id}
              </motion.span>
              
              <motion.h3
                className="text-3xl md:text-5xl font-display font-bold text-white leading-tight"
                style={{ opacity: opacityContents[index] }}
              >
                {section.title}
              </motion.h3>
              
              <motion.p
                className="text-lg text-white/70 max-w-md leading-relaxed"
                style={{ opacity: opacityContents[index] }}
              >
                {section.description}
              </motion.p>

              {/* Decorative line */}
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                style={{ opacity: opacityContents[index] }}
              />
            </motion.div>

            {/* Image */}
            <motion.div
              className={cn(
                "relative aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-2xl",
                section.reverse && "md:order-1"
              )}
              style={{
                opacity: opacityContents[index],
                clipPath: clipProgresses[index]
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10" />
              <img
                src={section.imageUrl}
                alt={section.title}
                className="w-full h-full object-cover"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 border border-emerald-500/20 rounded-2xl" />
              <div className="absolute -inset-1 bg-emerald-500/10 blur-xl -z-10 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      ))}

      {/* End marker */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
         viewport={{ once: true }}
          className="text-center -translate-y-16 md:-translate-y-24"
>

          <p className="text-2xl md:text-4xl font-display text-white/30">
            
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ParallaxScrollSection