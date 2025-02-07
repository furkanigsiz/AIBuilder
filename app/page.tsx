"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AuroraBackground from "../components/ui/aurora-background";
import { SplineSceneBasic } from "../components/ui/code.demo";
import { Button } from "../components/ui/moving-border";
import { PricingDemo } from "../components/ui/pricing-demo";
import { useRouter } from "next/navigation";
import { UserMenu } from "@/components/ui/user-menu";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const router = useRouter();

  const handleStartClick = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      router.push('/kaynaklar');
    } else {
      router.push('/auth');
    }
  };

  return (
    <AuroraBackground>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen flex items-center justify-center"
          >
            <div className="w-full max-w-6xl px-4">
              <SplineSceneBasic />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <Button
                  onClick={() => setShowIntro(false)}
                  className="bg-zinc-900/90 dark:bg-zinc-900/90 text-white border-zinc-800 backdrop-blur-sm"
                  containerClassName="w-52"
                  borderClassName="bg-[radial-gradient(var(--zinc-500)_40%,transparent_60%)]"
                >
                  Devam Et
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
              <div className="text-2xl font-bold dark:text-white">AI Builder</div>
              <div className="flex gap-8 items-center">
                <a href="/egitimler" className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors">AI Yolculuğu</a>
                <a href="/kaynaklar" className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors">Eğitimler</a>
                <a href="/iletisim" className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors">İletişim</a>
                <UserMenu />
              </div>
            </nav>

            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center px-4 max-w-7xl mx-auto text-center"
            >
              <div className="text-4xl md:text-7xl font-bold dark:text-white">
                AI Builder ile Geleceği İnşa Edin
              </div>
              <div className="text-base md:text-2xl dark:text-neutral-200 max-w-3xl">
                Yapay zeka ile kod yazmadan web siteleri ve uygulamalar geliştirmeyi öğrenin. 
                Modern AI framework'leri kullanarak projelerinizi hayata geçirin.
              </div>
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={handleStartClick}
                  className="bg-zinc-900/90 dark:bg-zinc-900/90 text-white border-zinc-800 backdrop-blur-sm"
                  containerClassName="w-52"
                  borderClassName="bg-[radial-gradient(var(--zinc-500)_40%,transparent_60%)]"
                >
                  Hemen Başla
                </Button>
                <a href="/egitimler" className="border border-black dark:border-white text-black dark:text-white rounded-full px-8 py-4 font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors w-52 text-center">
                  Daha Fazla Bilgi
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-0 right-0 p-8"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <h3 className="text-xl font-semibold dark:text-white mb-4">AI Framework'leri</h3>
                    <p className="dark:text-neutral-200">Modern yapay zeka araçlarını ve framework'lerini kullanmayı öğrenin.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <h3 className="text-xl font-semibold dark:text-white mb-4">No-Code Geliştirme</h3>
                    <p className="dark:text-neutral-200">Kod yazmadan web siteleri ve uygulamalar geliştirmenin yollarını keşfedin.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <h3 className="text-xl font-semibold dark:text-white mb-4">Proje Yönetimi</h3>
                    <p className="dark:text-neutral-200">AI destekli projelerinizi planlama ve yönetme becerilerini kazanın.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPricing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPricing(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <PricingDemo />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuroraBackground>
  );
} 