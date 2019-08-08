import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomMaterialModuleModule } from "../custom-material-module/custom-material-module.module";
import { LoginModuleRoutingModule } from "./login-module-routing.module";
import { LoginService } from "./login.service";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModuleModule,
    LoginModuleRoutingModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModuleModule { }
