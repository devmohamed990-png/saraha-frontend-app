import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { SettingComponent } from './rightpages/setting/setting.component';
import { MessageComponent } from './rightpages/message/message.component';
import { RouteguardserviceServiceService } from './services/routeguardservice-service.service';
import { SingupComponent } from './singup/singup.component';
import { UserComponent } from './rightpages/user/user.component';
import { EdituserComponent } from './rightpages/user/edituser/edituser.component';
import { SendingMessageComponent } from './sending-message/sending-message.component';
import { ThankingComponent } from './thanking/thanking.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'singup', component: SingupComponent },
  {
    path: 'main', component: MainHomeComponent,
    children: [
      { path: 'setting', component: SettingComponent },
      { path: 'message', component: MessageComponent },
      { path: 'user', component: UserComponent },
      { path: 'edit-user', component: EdituserComponent },
    ],
    canActivate: [RouteguardserviceServiceService]
  },
  { path: 'message', component: SendingMessageComponent },
  { path: 'thanking', component: ThankingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
