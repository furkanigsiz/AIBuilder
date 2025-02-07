import Iyzipay from 'iyzipay';

// API anahtarlarını kontrol et
const apiKey = process.env.IYZICO_API_KEY;
const secretKey = process.env.IYZICO_SECRET_KEY;

if (!apiKey || !secretKey) {
  console.warn('Iyzipay API anahtarları eksik. Ödeme işlemleri devre dışı.');
}

const iyzipay = new Iyzipay({
  apiKey: apiKey || 'dummy_key',
  secretKey: secretKey || 'dummy_secret',
  uri: process.env.NODE_ENV === 'production' 
    ? 'https://api.iyzipay.com' 
    : 'https://sandbox-api.iyzipay.com'
});

export default iyzipay; 