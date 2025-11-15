import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // default route
  { path: 'product/:id', component: ProductDetailsComponent }, // product details page
  { path: 'cart', component: CartComponent },       // <-- ADD THIS
  { path: '**', redirectTo: '' } // fallback for invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
