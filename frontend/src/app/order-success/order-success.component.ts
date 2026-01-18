import { Component } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss'
})
export class OrderSuccessComponent {
  paymentId = history.state?.paymentId || null;
}
