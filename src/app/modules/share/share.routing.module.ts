import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LsComponent } from "../../ls.component";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../register/register.module').then(mod => mod.RegisterModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('../users/users.module').then(mod => mod.UsersModule),
    canActivate: [LsComponent]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareRoutingModule { }
