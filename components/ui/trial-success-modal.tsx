"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as confetti from "canvas-confetti";
import { CheckCircle2 } from "lucide-react";

interface TrialSuccessModalProps {
  onClose: () => void;
}

export function TrialSuccessModal({ onClose }: TrialSuccessModalProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Konfeti efekti
    confetti.create(undefined, {
      resize: true,
      useWorker: true,
    })({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Her saniye geri sayımı güncelle
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // 5 saniye sonra otomatik kapanma
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl max-w-md w-full"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-white">
            Tebrikler! 🎉
          </h2>
          
          <p className="text-neutral-300">
            7 günlük ücretsiz deneme süreniz başarıyla aktifleştirildi. 
            Hemen içerikleri keşfetmeye başlayabilirsiniz.
          </p>

          <div className="mt-4 text-sm text-neutral-400">
            <span className="inline-flex items-center gap-1">
              <span>{countdown}</span> saniye içinde yönlendiriliyorsunuz...
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 