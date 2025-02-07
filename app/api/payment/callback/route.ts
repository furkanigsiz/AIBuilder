import { NextResponse } from 'next/server';
import iyzipay from '@/lib/iyzipay';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = formData.get('token') as string;

    // Ödeme sonucunu kontrol et
    iyzipay.checkoutForm.retrieve({
      token: token
    }, async function (err: any, result: any) {
      if (err) {
        return NextResponse.json({ error: err.errorMessage }, { status: 400 });
      }

      // Ödeme kaydını güncelle
      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('payment_form_token', token)
        .single();

      if (!payment) {
        return NextResponse.json({ error: 'Ödeme kaydı bulunamadı' }, { status: 404 });
      }

      // Ödeme durumunu güncelle
      await supabase
        .from('payments')
        .update({ 
          status: result.status === 'success' ? 'completed' : 'failed',
          payment_id: result.paymentId,
          processed_at: new Date().toISOString()
        })
        .eq('payment_form_token', token);

      // Başarılı ödemede kullanıcı profilini güncelle
      if (result.status === 'success') {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + (payment.plan_type === 'annual' ? 12 : 1));

        await supabase
          .from('user_profiles')
          .update({ 
            is_premium: true,
            subscription_end_date: endDate.toISOString(),
            current_plan: payment.plan_type
          })
          .eq('user_id', payment.user_id);

        // Başarılı ödeme sayfasına yönlendir
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/odeme/basarili`);
      } else {
        // Başarısız ödeme sayfasına yönlendir
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/odeme/basarisiz`);
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 