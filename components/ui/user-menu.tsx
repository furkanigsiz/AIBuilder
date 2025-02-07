"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  id: string;
}

interface UserMenuProps {
  user: User;
}

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı durumunu kontrol et
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user as User);
    };

    checkUser();

    // Auth durumu değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as User ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    router.push('/');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-white/5 transition-colors"
      >
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
            {user ? 'AI' : '?'}
          </AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0A0A0A] border border-white/5 shadow-lg z-50"
            >
              <div className="p-2">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        router.push('/profil');
                        setIsOpen(false);
                      }}
                      className="w-full p-2 text-left text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      Profil
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full p-2 text-left text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      router.push('/auth');
                      setIsOpen(false);
                    }}
                    className="w-full p-2 text-left text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Giriş Yap
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 