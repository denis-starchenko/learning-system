import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CustomMaterialModuleModule } from "../custom-material-module/custom-material-module.module";



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    CustomMaterialModuleModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ShareModuleModule { }
