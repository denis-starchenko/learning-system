import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LsRoutingModule } from './ls-routing.module';
import { LsComponent } from './ls.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from "./modules/custom-material/custom-material.module";
import { ShareModule } from "./modules/share/share.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./Interceptors/auth-interceptor";
import { AuthService } from "./services/auth.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "./store/effects/login.effects";
import {reducers} from "./store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";



@NgModule({
  declarations: [
    LsComponent,
  ],
  imports: [
    BrowserModule,
    LsRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    ShareModule,
    HttpClientModule,
    StoreModule.forRoot({token: reducers.layout}),
    EffectsModule.forRoot([LoginEffects]),
    StoreDevtoolsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [LsComponent]
})
export class LsModule { }
