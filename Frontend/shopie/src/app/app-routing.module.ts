import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { LoginformComponent } from './loginform/loginform.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { GetallusersComponent } from './getallusers/getallusers.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginformComponent },
  { path: 'adminhome', component: AdminhomeComponent },
  { path: 'adminusers', component: GetallusersComponent },
  { path: 'adminaddproduct', component: AddproductComponent },
  { path: 'user', component: UserhomeComponent },
  { path: 'viewproduct', component: ProductModalComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'adminprofile', component: AdminprofileComponent},

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
