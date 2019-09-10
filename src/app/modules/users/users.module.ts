import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from "./users.routing.module";
import { GroupsComponent } from "./groups/groups.component";
import { GroupsService } from "./groups/groups.service";
import { CustomMaterialModule } from "../custom-material/custom-material.module";
import { TooltipDirective } from "./tooltip.directive";
import { CurrencyPipe } from "./groups/currency.pipe";



@NgModule({
  declarations: [
    GroupsComponent,
    TooltipDirective,
    CurrencyPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CustomMaterialModule
  ],
  providers: [
    GroupsService
  ]
})
export class UsersModule { }
