import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PackagesComponent } from './packages/packages.component';
import { ViewPackageComponent } from './view-package/view-package.component';
import { BookPackageComponent } from './book-package/book-package.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { PaymentComponent } from './payment/payment.component';
import { ContactComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { MessagesComponent } from './admin/messages/messages.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    { path: 'packages', component: PackagesComponent },
    { path: 'view-package/:id', component: ViewPackageComponent },
    { path: 'book-package/:id', component: BookPackageComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'booking-history', component: BookingHistoryComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'contact-us', component: ContactComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'messages', component:MessagesComponent },
    { path: 'adminlogin', component: AdminLoginComponent},
    { path: 'admindash', component: AdmindashboardComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }