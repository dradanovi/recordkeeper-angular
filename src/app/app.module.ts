import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './admin/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HeaderComponent } from './header/header.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeCardComponent } from './work/employee-card/employee-card.component';
import { SubjectsComponent } from './work/subjects/subjects.component';
import { ViewWorkComponent } from './work/view-work/view-work.component';
import { WorkComponent } from './work/work/work.component';
import { MatListModule } from '@angular/material/list';
import { TokenInterceptor } from './token-interceptor';
import { HoursComponent } from './work/hours/hours.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SubjectsPopupComponent } from './work/subjects/popup/subjects-popup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { SubjectPopupComponent } from './work/view-work/subject-popup/subject-popup.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { AdminComponent } from './admin/admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { ViewUsersPopupComponent } from './admin/view-users/view-users-popup/view-users-popup.component';
import { ApixuService } from './weather/apixu.service';
import { WeatherComponent } from './weather/weather.component';
import { ImgComponent } from './admin/user-details/img/img.component';
import { AuthService } from './auth/shared/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    EmployeeCardComponent,
    SubjectsComponent,
    ViewWorkComponent,
    WorkComponent,
    HoursComponent,
    SubjectsPopupComponent,
    SubjectPopupComponent,
    ViewUsersComponent,
    UserDetailsComponent,
    AdminComponent,
    ViewUsersPopupComponent,
    WeatherComponent,
    ImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSelectModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, UserDetailsComponent, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
