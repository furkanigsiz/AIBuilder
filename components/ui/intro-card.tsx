"use client";

import { motion } from "framer-motion";
import { Card } from "./card";
import { ArrowRight } from "lucide-react";

interface IntroCardProps {
  onContinue: () => void;
}

export function IntroCard({ onContinue }: IntroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto p-4"
    >
      <Card className="p-8 bg-white/10 backdrop-blur-sm border border-white/20">
        <div className="flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-400">
              AI Builder'a Hoş Geldiniz
            </h1>
            <p className="text-neutral-300 text-lg">
              Yapay zeka ile web geliştirmenin geleceğini keşfedin
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full max-w-md space-y-4"
          >
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white">Kod Yazmadan Geliştirin</p>
                <p className="text-neutral-400 mt-1">Modern AI araçlarıyla hızlı çözümler</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white">Pratik Öğrenin</p>
                <p className="text-neutral-400 mt-1">Gerçek projelerle deneyim kazanın</p>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={onContinue}
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Keşfetmeye Başla
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
} 