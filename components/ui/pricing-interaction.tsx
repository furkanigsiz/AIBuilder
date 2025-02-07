import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AnimatePresence } from "framer-motion";
import { TrialSuccessModal } from "./trial-success-modal";

export function PricingInteraction() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <div className="max-w-2xl w-full flex flex-col items-center gap-6 p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10">
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
      </div>

      <AnimatePresence>
        {showSuccess && (
          <TrialSuccessModal onClose={handleSuccessClose} />
        )}
      </AnimatePresence>
    </>
  );
}; 