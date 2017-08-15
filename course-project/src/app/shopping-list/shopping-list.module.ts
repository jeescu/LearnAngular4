import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ShoppingListComponent } from "app/shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "app/shopping-list/shopping-edit/shopping-edit.component";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ShoppingListModule { }