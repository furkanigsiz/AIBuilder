declare module 'iyzipay' {
  interface IyzipayOptions {
    apiKey: string;
    secretKey: string;
    uri: string;
  }

  interface CheckoutFormInitialize {
    create: (request: any, callback: (err: any, result: any) => void) => void;
  }

  interface CheckoutForm {
    retrieve: (request: any, callback: (err: any, result: any) => void) => void;
  }

  export default class Iyzipay {
    constructor(options: IyzipayOptions);
    checkoutFormInitialize: CheckoutFormInitialize;
    checkoutForm: CheckoutForm;
  }
} 