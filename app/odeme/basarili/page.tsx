"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/moving-border";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function OdemeBasarili() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black/90 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full p-8 rounded-2xl bg-[#0A0A0A] border border-white/5"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="size-20 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-green-600">
            Ödeme Başarılı!
          </h1>
          
          <p className="text-neutral-300">
            Ödemeniz başarıyla gerçekleşti. Premium üyeliğiniz aktif edildi.
            Artık tüm içeriklere erişebilirsiniz.
          </p>

          <div className="flex flex-col gap-4 w-full">
            <Button
              onClick={() => router.push('/kaynaklar')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none"
            >
              Kaynaklara Git
            </Button>
            
            <button
              onClick={() => router.push('/')}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 