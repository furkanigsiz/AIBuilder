"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LampContainer } from "@/components/ui/lamp";

export default function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsAuthenticated(true);
        router.push('/kaynaklar');
        return;
      }
    } catch (error) {
      console.error('Auth durumu kontrolü hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth`
          }
        });
        
        if (signUpError) throw signUpError;

        if (signUpData.user) {
          setError("Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.");
          setEmail("");
          setPassword("");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        router.push("/kaynaklar");
      }
    } catch (error: unknown) {
      console.error('Auth hatası:', error);
      if (error instanceof Error) {
        if (error.message === 'User already registered') {
          setError('Bu e-posta adresi zaten kayıtlı');
        } else {
          setError(error.message);
        }
      } else {
        setError('Bir hata oluştu');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black/90 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Kullanıcı zaten giriş yapmışsa hiçbir şey gösterme
  }

  return (
    <div className="min-h-screen bg-black/90">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen"
          >
            <LampContainer>
              <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
              >
                Yolculuğa <br /> Hazır mısın?
              </motion.h1>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                onClick={() => setShowForm(true)}
                className="px-8 py-4 backdrop-blur-sm border border-white/10 text-white rounded-full mt-16 hover:border-white/20 transition-colors"
              >
                Başlayalım
              </motion.button>
            </LampContainer>
          </motion.div>
        ) : (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0A0A0A] border border-white/5 p-8 rounded-2xl backdrop-blur-sm"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-blue-500 to-purple-500">
                    {isSignUp ? "Hesap Oluştur" : "Giriş Yap"}
                  </h1>
                  <p className="text-neutral-400 mt-2">
                    {isSignUp
                      ? "AI Builder'a hoş geldiniz"
                      : "Hesabınıza giriş yapın"}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-1">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-black/50 border border-white/5 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-1">
                      Şifre
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-black/50 border border-white/5 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading
                      ? "İşleniyor..."
                      : isSignUp
                      ? "Kayıt Ol"
                      : "Giriş Yap"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {isSignUp
                      ? "Zaten hesabınız var mı? Giriş yapın"
                      : "Hesabınız yok mu? Kayıt olun"}
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 