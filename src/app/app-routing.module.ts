import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpSignInComponent } from './emp-sign-in/emp-sign-in.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'backoffice',
    pathMatch: 'full',
  },
  {
    path: 'backoffice',
    component: HomeComponent,
  },
  {
    path: 'emp-signin',
    component: EmpSignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
