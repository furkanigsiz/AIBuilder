import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AnimatePresence } from "framer-motion";
import { TrialSuccessModal } from "./trial-success-modal";

export function PricingInteraction ({
  proMonth,
  proAnnual,
}:{
  proMonth: number;
  proAnnual: number;
}) {
  const [active, setActive] = useState(0);
  const [pricingType, setPricingType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleChangePlan = (index: number) => {
    setActive(index);
  };

  const handleChangePricingType = (index: number) => {
    setPricingType(index);
  };

  const startFreeTrial = async () => {
    try {
      setLoading(true);
      
      // Mevcut kullanıcıyı al
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth');
        return;
      }

      console.log('Kullanıcı ID:', user.id);

      // Deneme süresini başlat
      const response = await fetch('/api/trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      // Başarılı modal'ı göster
      setShowSuccess(true);

    } catch (error: any) {
      console.error('Deneme süresi başlatma hatası:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.push('/kaynaklar');
    // Sayfayı yenile
    window.location.reload();
  };

  // Fiyat formatı için yardımcı fonksiyon
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <>
      <div className="max-w-2xl w-full flex flex-col items-center gap-6 p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10">
        <div className="w-full">
          <div className="rounded-2xl relative w-full bg-white/5 p-2 flex items-center">
            <button
              className="font-medium rounded-xl w-full p-2.5 text-white z-20"
              onClick={() => handleChangePricingType(0)}
            >
              Deneme
            </button>
            <button
              className="font-medium rounded-xl w-full p-2.5 text-white z-20"
              onClick={() => handleChangePricingType(1)}
            >
              Ücretli
            </button>
            <div
              className="p-2.5 flex items-center justify-center absolute inset-0 w-1/2 z-10"
              style={{
                transform: `translateX(${pricingType * 100}%)`,
                transition: "transform 0.3s",
              }}
            >
              <div className="bg-white/10 shadow-lg rounded-xl w-full h-full"></div>
            </div>
          </div>
        </div>

        {pricingType === 0 ? (
          // Deneme Planı
          <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/20">
            <div className="flex flex-col items-start">
              <p className="font-semibold text-2xl text-white">Ücretsiz Deneme</p>
              <p className="text-neutral-300 mt-1">7 gün boyunca temel eğitimlere erişim</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  3 Temel AI Eğitimi
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  Başlangıç Seviye Projeler
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  Temel AI Prompt Örnekleri
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  Temel Eğitim Dökümanları
                </li>
              </ul>
            </div>
            <button 
              onClick={startFreeTrial}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'İşleniyor...' : 'Ücretsiz Başla'}
            </button>
          </div>
        ) : (
          // Ücretli Planlar
          <div className="w-full space-y-4">
            <div
              className={`w-full p-6 rounded-2xl transition-all duration-200 ${
                active === 0
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/20"
                  : "bg-white/5 border border-white/10"
              }`}
              onClick={() => handleChangePlan(0)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-2xl text-white">Gelişmiş Eğitim</p>
                  <p className="text-neutral-300 mt-1 flex items-center">
                    <span className="text-white font-medium flex items-center">
                      ₺{formatPrice(proMonth)}
                    </span>
                    /ay
                  </p>
                </div>
                <div className="flex items-center justify-center size-6 rounded-full border-2 transition-colors duration-200"
                  style={{ borderColor: active === 0 ? "white" : "rgb(255 255 255 / 0.2)" }}>
                  <div className="size-3 bg-white rounded-full transition-opacity duration-200"
                    style={{ opacity: active === 0 ? 1 : 0 }}></div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  25+ Video Eğitim İçeriği
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  10+ Uygulama Geliştirme Projesi
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  Temel Prompt Mühendisliği Eğitimi
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  AI Proje Şablonları
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  Discord Topluluğu Erişimi
                </li>
              </ul>
            </div>

            <div
              className={`w-full p-6 rounded-2xl transition-all duration-200 ${
                active === 1
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/20"
                  : "bg-white/5 border border-white/10"
              }`}
              onClick={() => handleChangePlan(1)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-2xl text-white">Profesyonel</p>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-lg">
                      Popüler
                    </span>
                  </div>
                  <p className="text-neutral-300 mt-1 flex items-center">
                    <span className="text-white font-medium flex items-center">
                      ₺{formatPrice(proAnnual)}
                    </span>
                    /ay
                  </p>
                </div>
                <div className="flex items-center justify-center size-6 rounded-full border-2 transition-colors duration-200"
                  style={{ borderColor: active === 1 ? "white" : "rgb(255 255 255 / 0.2)" }}>
                  <div className="size-3 bg-white rounded-full transition-opacity duration-200"
                    style={{ opacity: active === 1 ? 1 : 0 }}></div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  Tüm Gelişmiş Eğitim İçerikleri
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  50+ İleri Seviye Video Eğitim
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  İleri Seviye Prompt Mühendisliği
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  Detaylı PRD ve RFC Hazırlama
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  Özel AI Model Fine-tuning Eğitimi
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-blue-400"></div>
                  Kapsamlı Dokümantasyon Erişimi
                </li>
              </ul>
            </div>
          </div>
        )}

        {pricingType === 1 && (
          <button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 font-medium hover:opacity-90 transition-opacity">
            Planı Seç
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuccess && (
          <TrialSuccessModal onClose={handleSuccessClose} />
        )}
      </AnimatePresence>
    </>
  );
}; 