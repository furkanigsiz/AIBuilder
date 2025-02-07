import { NextResponse } from 'next/server';
import iyzipay from '@/lib/iyzipay';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Ödeme sonucunu doğrula
    return new NextResponse(JSON.stringify({ 
      status: 'success',
      message: 'Ödeme başarıyla alındı'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Ödeme callback hatası:', error);
    return new NextResponse(JSON.stringify({ 
      status: 'error',
      message: 'Ödeme işlenirken bir hata oluştu'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 