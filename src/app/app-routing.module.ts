import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpSignInComponent } from './emp-sign-in/emp-sign-in.component';

const routes: Routes = [
  {
    path: 'emp-signin',
    component: EmpSignInComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
