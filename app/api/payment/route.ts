import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Ödeme başarıyla alındı'
    });
  } catch (error) {
    console.error('Ödeme hatası:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Ödeme işlenirken bir hata oluştu'
    }, { status: 500 });
  }
} 