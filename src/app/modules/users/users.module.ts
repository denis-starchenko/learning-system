import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from "./users.routing.module";
import { GroupsComponent } from "./groups/groups.component";
import { GroupsService } from "./groups/groups.service";
import { CustomMaterialModule } from "../custom-material/custom-material.module";
import { TooltipDirective } from "./tooltip.directive";
import { CurrencyPipe } from "./groups/currency.pipe";
import { DialogAddGroupComponent } from "./dialog-add-group/dialog-add-group.component";
import { MatDialogModule } from "@angular/material";
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    GroupsComponent,
    TooltipDirective,
    CurrencyPipe,
    DialogAddGroupComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CustomMaterialModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    GroupsService
  ],
  entryComponents: [
    DialogAddGroupComponent
  ]
})
export class UsersModule { }
