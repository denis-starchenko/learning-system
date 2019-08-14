import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CustomMaterialModule } from "../custom-material/custom-material.module";
import { ShareRoutingModule } from "./share.routing.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    ShareRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ShareModule { }
