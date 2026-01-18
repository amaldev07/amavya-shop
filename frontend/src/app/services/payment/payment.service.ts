import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var Razorpay: any;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  // replace with your deployed function URL OR use hosting rewrite later

  /*
    http://127.0.0.1:5001/amavya-shop/us-central1/hello
    https://us-central1-amavya-shop.cloudfunctions.net/hello 
   */

  // private baseUrl = 'https://us-central1-amavya-shop.cloudfunctions.net/';
  private baseUrl = 'http://127.0.0.1:5001/amavya-shop/us-central1/';
  private createOrderUrl = `${this.baseUrl}createOrder`;
  private verifyUrl = `${this.baseUrl}verifyPayment`;

  // from Razorpay dashboard (public key is safe in frontend)
  private razorpayKeyId = 'rzp_test_S5FYx0Dbk4ot1T';

  constructor(private http: HttpClient) { }

  pay(amountInRupees: number, customer?: { name?: string; email?: string; contact?: string }) {
    const amount = amountInRupees * 100; // paise
    debugger;
    this.http.post<any>(this.createOrderUrl, { amount, currency: 'INR' }).subscribe(order => {
      const options = {
        key: this.razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Amavya Jewellery',
        description: 'Order Payment',
        order_id: order.id,
        prefill: {
          name: customer?.name || '',
          email: customer?.email || '',
          contact: customer?.contact || ''
        },
        handler: (response: any) => {
          // Verify on backend
          this.http.post<any>(this.verifyUrl, response).subscribe(v => {
            if (v.success) {
              alert('✅ Payment successful!');
              // TODO: clear cart + navigate to success page
            } else {
              alert('⚠️ Payment verification failed.');
            }
          });
        },
        modal: {
          ondismiss: () => {
            // user closed popup
          }
        },
        theme: {
          color: '#3b1d3f' // royal purple
        }
      };

      const rzp = new Razorpay(options);

      rzp.on('payment.failed', (err: any) => {
        alert('❌ Payment failed. Please try again.');
        console.error(err);
      });

      rzp.open();
    });
  }
}
