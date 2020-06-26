import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { AppComponent } from './app.component';
import { AuthService } from './auth/shared/auth.service';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work/work.component';
import { EmployeeCardComponent } from './work/employee-card/employee-card.component';
import { SubjectsComponent } from './work/subjects/subjects.component';
import { ViewWorkComponent } from './work/view-work/view-work.component';
import { AdminComponent } from './admin/admin/admin.component';
import { PermissionsService } from './permissions.service';


const routes: Routes = [
  { path: '', redirectTo: '/work', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'admin', component: AdminComponent, canActivate:[PermissionsService] },
  { path: 'login', component: LoginComponent },
  { path: 'work', component: WorkComponent },
  { path: 'employee', component: EmployeeCardComponent },
  { path: 'subject', component: SubjectsComponent },
  { path: 'review', component: ViewWorkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
