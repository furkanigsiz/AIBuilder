"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/moving-border";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function OdemeBasarisiz() {
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
          <div className="size-20 rounded-full bg-red-500/10 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-red-400 to-red-600">
            Ödeme Başarısız
          </h1>
          
          <p className="text-neutral-300">
            Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin veya farklı bir ödeme yöntemi kullanın.
          </p>

          <div className="flex flex-col gap-4 w-full">
            <Button
              onClick={() => router.back()}
              className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white border-none"
            >
              Tekrar Dene
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