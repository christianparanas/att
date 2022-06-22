import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthService } from './services/auth.service';
import { StudentsComponent } from './pages/students/students.component';
import { ClassComponent } from './pages/class/class.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthService] },
  { path: 'class', component: ClassComponent, canActivate: [AuthService] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthService] },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
