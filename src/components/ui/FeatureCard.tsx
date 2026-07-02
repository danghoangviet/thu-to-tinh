"use client";

import React from "react";
import { motion } from "framer-motion";
import { DivideIcon as LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors"
    >
      <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 text-zinc-100">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-zinc-100 mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};
