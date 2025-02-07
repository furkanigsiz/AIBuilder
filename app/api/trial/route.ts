import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Service role ile yeni bir client oluştur
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();

    console.log('Gelen user_id:', user_id);

    // Kullanıcı bilgilerini kontrol et
    let { data: userData, error: userError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    console.log('Bulunan profil:', userData);
    console.log('Profil arama hatası:', userError);

    if (userError) {
      // Profil bulunamadıysa oluştur
      const { data: newProfile, error: createError } = await supabaseAdmin
        .from('user_profiles')
        .insert([
          { 
            user_id: user_id,
            is_premium: false
          }
        ])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      userData = newProfile;
    }

    if (!userData) {
      return NextResponse.json({ error: 'Kullanıcı profili oluşturulamadı' }, { status: 404 });
    }

    // Kullanıcının daha önce deneme süresi kullanıp kullanmadığını kontrol et
    if (userData.trial_end_date) {
      return NextResponse.json(
        { error: 'Bu hesap daha önce deneme süresi kullanmış' },
        { status: 400 }
      );
    }

    // 7 günlük deneme süresi başlat
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    // Kullanıcı profilini güncelle
    const { error: updateError } = await supabaseAdmin
      .from('user_profiles')
      .update({
        trial_end_date: trialEndDate.toISOString(),
        is_premium: true,
        subscription_end_date: trialEndDate.toISOString()
      })
      .eq('user_id', user_id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      message: 'Deneme süresi başarıyla başlatıldı',
      trial_end_date: trialEndDate
    });

  } catch (error: any) {
    console.error('Trial API Hatası:', error);
    return NextResponse.json(
      { error: error.message || 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 