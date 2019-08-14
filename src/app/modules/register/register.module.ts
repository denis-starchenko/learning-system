import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from "./register.routing.module";
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomMaterialModule } from "../custom-material/custom-material.module";
import { RegisterService } from "./register.service";



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModule
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterModule { }
