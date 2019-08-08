import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CustomMaterialModuleModule } from "../custom-material-module/custom-material-module.module";
import { ShareModuleRoutingModule } from "./share-module-routing.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModuleModule,
    ShareModuleRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ShareModuleModule { }
