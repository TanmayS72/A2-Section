import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  centered?: boolean;
}

export const SectionTitle = ({ title, subtitle, children, centered = true }: SectionTitleProps) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className={`mt-6 h-1 bg-gradient-to-r from-primary to-primary-glow rounded-full ${
          centered ? 'w-24 mx-auto' : 'w-24'
        }`}
      />
    </div>
  );
};

export default SectionTitle;
