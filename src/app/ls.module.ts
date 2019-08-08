import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LsRoutingModule } from './ls-routing.module';
import { LsComponent } from './ls.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModuleModule } from "./modules/custom-material-module/custom-material-module.module";
import { ShareModuleModule } from "./modules/share-module/share-module.module";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    LsComponent,
  ],
  imports: [
    BrowserModule,
    LsRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModuleModule,
    ShareModuleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [LsComponent]
})
export class LsModule { }