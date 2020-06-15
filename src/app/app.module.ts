import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, TemplateRef } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule, NgxPermissionsService, NgxPermissionsStore, NgxPermissionsConfigurationStore, NgxRolesStore } from 'ngx-permissions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';





import { SingupComponent } from './singup/singup.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RightpagesComponent } from './rightpages/rightpages.component';
import { SettingComponent } from './rightpages/setting/setting.component';
import { MessageComponent } from './rightpages/message/message.component';
import { UserComponent } from './rightpages/user/user.component';
import { EdituserComponent } from './rightpages/user/edituser/edituser.component';
import { SendingMessageComponent } from './sending-message/sending-message.component';
import { ThankingComponent } from './thanking/thanking.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    MainHomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RightpagesComponent,
    SettingComponent,
    MessageComponent,
    UserComponent,
    EdituserComponent,
    SendingMessageComponent,
    ThankingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true,
      rolesIsolate: true
    }),
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDividerModule,
    MatGridListModule,
    MatBadgeModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ClipboardModule,




  ],
  entryComponents: [
    SingupComponent
  ],
  providers: [NgxPermissionsService, NgxPermissionsStore, NgxPermissionsConfigurationStore, NgxRolesStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
