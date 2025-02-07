"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/moving-border";
import { PricingDemo } from "@/components/ui/pricing-demo";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserMenu } from "@/components/ui/user-menu";

export default function Egitimler() {
  const [showPricing, setShowPricing] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black/90">
      {/* Geri Dönüş Butonu */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Ana Sayfa</span>
        </button>
      </div>

      {/* Kullanıcı Menüsü */}
      <div className="fixed top-6 right-6 z-50">
        <UserMenu />
      </div>

      {/* Hero Bölümü */}
      <div className="relative pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-blue-500 to-purple-500 py-4">
              AI ile Geleceğe Yolculuk
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mt-2">
              Yapay zeka dünyasına ilk adımınızı atın. Modern AI teknolojileri ile tanışın ve geleceği şekillendirin.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Özellikler Bölümü */}
      <div className="py-20 px-4 bg-gradient-to-b from-black/50 to-black/90">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Kapsamlı Eğitim İçeriği</h3>
              <ul className="space-y-3 text-neutral-300">
                <li>• 50+ Video Eğitim</li>
                <li>• Detaylı Dokümantasyonlar</li>
                <li>• Gerçek Dünya Projeleri</li>
                <li>• AI Prompt Mühendisliği</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Pratik Odaklı Öğrenme</h3>
              <ul className="space-y-3 text-neutral-300">
                <li>• Adım Adım Uygulama Geliştirme</li>
                <li>• Hazır Proje Şablonları</li>
                <li>• Modern AI Araçları Kullanımı</li>
                <li>• Özelleştirilebilir Çözümler</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Profesyonel Gelişim</h3>
              <ul className="space-y-3 text-neutral-300">
                <li>• PRD ve RFC Hazırlama</li>
                <li>• AI Model Fine-tuning</li>
                <li>• İleri Seviye Teknikler</li>
                <li>• Güncel Teknoloji Takibi</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Neden Biz Bölümü */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
          >
            Neden AI Builder?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5"
              >
                <h3 className="text-xl font-semibold text-white mb-3">Güncel ve Modern Eğitim</h3>
                <p className="text-neutral-400">
                  Sürekli güncellenen içeriklerle en son AI teknolojilerini ve best practice'leri öğrenin.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5"
              >
                <h3 className="text-xl font-semibold text-white mb-3">Hızlı Öğrenme</h3>
                <p className="text-neutral-400">
                  Kod yazmadan, pratik odaklı eğitimlerle AI projelerinizi hızla hayata geçirin.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5"
              >
                <h3 className="text-xl font-semibold text-white mb-3">Detaylı Kaynaklar</h3>
                <p className="text-neutral-400">
                  Video eğitimlerin yanında kapsamlı dökümanlar ve hazır şablonlarla öğrenmenizi pekiştirin.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5"
              >
                <h3 className="text-xl font-semibold text-white mb-3">Esnek Öğrenme</h3>
                <p className="text-neutral-400">
                  Kendi hızınızda, istediğiniz zaman ve yerde eğitimlere erişin ve öğrenin.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5"
              >
                <h3 className="text-xl font-semibold text-white mb-3">Proje Odaklı</h3>
                <p className="text-neutral-400">
                  Gerçek dünya projelerini geliştirerek pratik deneyim kazanın.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5"
              >
                <h3 className="text-xl font-semibold text-white mb-3">Sürekli Güncellenen İçerik</h3>
                <p className="text-neutral-400">
                  AI teknolojilerindeki son gelişmeleri takip eden güncel eğitim içerikleri.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bölümü */}
      <div className="py-20 px-4 bg-gradient-to-t from-black/50 to-black/90">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              AI Dünyasına Adım Atmaya Hazır mısınız?
            </h2>
            <p className="text-xl text-neutral-300">
              7 günlük ücretsiz deneme ile AI Builder'ın sunduğu fırsatları keşfedin.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowPricing(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none"
                containerClassName="w-full md:w-[250px]"
              >
                Hemen Başla
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fiyatlandırma Modal */}
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
    </div>
  );
} 