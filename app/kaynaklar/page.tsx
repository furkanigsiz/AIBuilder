"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/moving-border";
import { PricingDemo } from "@/components/ui/pricing-demo";
import { UserMenu } from "@/components/ui/user-menu";

export default function Kaynaklar() {
  const router = useRouter();
  const [showPricing, setShowPricing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      setIsAuthenticated(!!user);
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        const trialEnd = new Date(profile.trial_end_date);
        const now = new Date();
        
        if (profile.is_premium || trialEnd > now) {
          setHasAccess(true);
          
          if (!profile.is_premium && trialEnd > now) {
            setIsTrialActive(true);
            const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            setTrialDaysLeft(daysLeft);
          }
        }
      }
    } catch (error) {
      console.error('Erişim kontrolü hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black/90 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    );
  }

  if (!hasAccess) {
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

        <div className="h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="size-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-blue-500 to-purple-500">
                Premium İçerik
              </h1>
              <p className="text-xl text-neutral-300 max-w-xl mx-auto">
                {isAuthenticated 
                  ? "7 günlük ücretsiz deneme ile AI Builder'ın sunduğu tüm eğitimlere erişebilirsiniz."
                  : "Bu içeriğe erişmek için giriş yapmanız gerekiyor. AI Builder'ın sunduğu tüm eğitimlere erişim için hemen üye olun."
                }
              </p>
              <div className="flex flex-col items-center gap-4">
                {isAuthenticated ? (
                  <Button
                    onClick={() => setShowPricing(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none"
                    containerClassName="w-full md:w-[250px]"
                  >
                    Denemeyi Başlat
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push('/auth')}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none"
                    containerClassName="w-full md:w-[250px]"
                  >
                    Giriş Yap
                  </Button>
                )}
                <button
                  onClick={() => router.push('/')}
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Ana Sayfaya Dön
                </button>
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

      {isTrialActive && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-center">
            <p className="text-blue-400 text-sm">
              Deneme sürenizden {trialDaysLeft} gün kaldı! 
              <Button
                onClick={() => setShowPricing(true)}
                className="ml-2 bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full hover:bg-blue-500/30"
              >
                Premium'a Geç
              </Button>
            </p>
          </div>
        </div>
      )}

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
              AI Builder Eğitimleri
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mt-2">
              Yapay zeka öğrenme yolculuğunuzda ihtiyacınız olan tüm eğitimler burada.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Kaynaklar Grid */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dokümantasyonlar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 group hover:border-white/10 transition-colors"
            >
              <div className="h-48 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-blue-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Dokümantasyonlar</h3>
              <p className="text-neutral-400 mb-4">Detaylı API referansları, kullanım kılavuzları ve teknik belgeler.</p>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">Dokümanlara Göz At →</a>
            </motion.div>

            {/* Örnek Projeler */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 group hover:border-white/10 transition-colors"
            >
              <div className="h-48 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-green-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Örnek Projeler</h3>
              <p className="text-neutral-400 mb-4">Gerçek dünya uygulamaları ve başlangıç projeleri.</p>
              <a href="#" className="text-green-400 hover:text-green-300 text-sm font-medium">Projeleri İncele →</a>
            </motion.div>

            {/* AI Modelleri */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 group hover:border-white/10 transition-colors"
            >
              <div className="h-48 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-purple-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Modelleri</h3>
              <p className="text-neutral-400 mb-4">Önceden eğitilmiş modeller ve fine-tuning örnekleri.</p>
              <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium">Modelleri Keşfet →</a>
            </motion.div>

            {/* Video Eğitimler */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 group hover:border-white/10 transition-colors"
            >
              <div className="h-48 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-red-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Video Eğitimler</h3>
              <p className="text-neutral-400 mb-4">Adım adım öğretici videolar ve pratik uygulamalar.</p>
              <a href="#" className="text-red-400 hover:text-red-300 text-sm font-medium">Videoları İzle →</a>
            </motion.div>

            {/* Topluluk */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 group hover:border-white/10 transition-colors"
            >
              <div className="h-48 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-yellow-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Topluluk</h3>
              <p className="text-neutral-400 mb-4">Discord topluluğumuz ve forum tartışmaları.</p>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">Topluluğa Katıl →</a>
            </motion.div>

            {/* Blog */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 group hover:border-white/10 transition-colors"
            >
              <div className="h-48 rounded-xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-indigo-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Blog</h3>
              <p className="text-neutral-400 mb-4">Güncel AI haberleri ve teknik makaleler.</p>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Blog'u Ziyaret Et →</a>
            </motion.div>
          </div>
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