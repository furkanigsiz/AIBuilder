"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserMenu } from "@/components/ui/user-menu";

export default function Iletisim() {
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

      {/* İletişim Bölümü */}
      <div className="relative pt-20 pb-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-blue-500 to-purple-500 py-4">
              İletişim
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mt-4 mb-12">
              Benimle iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.
            </p>

            <div className="grid gap-8 max-w-2xl mx-auto">
              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/furkan-i%C4%9Fsiz-2b0467254/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 group hover:border-white/10 transition-colors flex items-center gap-6"
              >
                <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-1">LinkedIn</h3>
                  <p className="text-neutral-400">Furkan İğsiz</p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:furkanigsizz@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 group hover:border-white/10 transition-colors flex items-center gap-6"
              >
                <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-1">E-posta</h3>
                  <p className="text-neutral-400">furkanigsizz@gmail.com</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 