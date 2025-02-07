import { NextResponse } from 'next/server';
import iyzipay from '@/lib/iyzipay';
import { supabase } from '@/lib/supabase';

interface PaymentRequest {
  user_id: string;
  plan_type: 'monthly' | 'annual';
  price: number;
}

interface IyzipayRequest {
  locale: string;
  conversationId: string;
  price: string;
  paidPrice: string;
  currency: string;
  installment: string;
  basketId: string;
  paymentChannel: string;
  paymentGroup: string;
  callbackUrl: string;
  buyer: {
    id: string;
    name: string;
    surname: string;
    email: string;
    identityNumber: string;
    registrationAddress: string;
    ip: string;
    city: string;
    country: string;
  };
  shippingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
  };
  billingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
  };
  basketItems: Array<{
    id: string;
    name: string;
    category1: string;
    itemType: string;
    price: string;
  }>;
}

export async function POST(req: Request) {
  try {
    const { user_id, plan_type, price } = await req.json() as PaymentRequest;

    // Kullanıcı bilgilerini al
    const { data: userData } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (!userData) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    // Ödeme isteği oluştur
    const paymentRequest: IyzipayRequest = {
      locale: 'tr',
      conversationId: `${user_id}_${Date.now()}`,
      price: price.toString(),
      paidPrice: price.toString(),
      currency: 'TRY',
      installment: '1',
      basketId: `B${Date.now()}`,
      paymentChannel: 'WEB',
      paymentGroup: 'PRODUCT',
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`,
      
      buyer: {
        id: user_id,
        name: userData.full_name || 'İsimsiz',
        surname: 'Kullanıcı',
        email: userData.email,
        identityNumber: '11111111111',
        registrationAddress: 'Türkiye',
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
      },
      
      shippingAddress: {
        contactName: userData.full_name || 'İsimsiz Kullanıcı',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Türkiye',
      },
      
      billingAddress: {
        contactName: userData.full_name || 'İsimsiz Kullanıcı',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Türkiye',
      },
      
      basketItems: [
        {
          id: `PLAN_${plan_type}`,
          name: `AI Builder ${plan_type} Plan`,
          category1: 'Üyelik',
          itemType: 'VIRTUAL',
          price: price.toString()
        }
      ]
    };

    // Ödeme formu oluştur
    iyzipay.checkoutFormInitialize.create(paymentRequest, async function (err: any, result: any) {
      if (err) {
        return NextResponse.json({ error: err.errorMessage }, { status: 400 });
      }

      // Ödeme kaydını oluştur
      await supabase
        .from('payments')
        .insert([
          {
            user_id,
            plan_type,
            amount: price,
            status: 'pending',
            conversation_id: paymentRequest.conversationId,
            payment_form_token: result.token
          }
        ]);

      return NextResponse.json({ 
        checkoutFormContent: result.checkoutFormContent,
        token: result.token 
      });
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 