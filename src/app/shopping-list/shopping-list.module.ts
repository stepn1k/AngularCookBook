import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";

const shoppingListComponents = [
  ShoppingListComponent,
  ShoppingEditComponent,
];

@NgModule({
  declarations: shoppingListComponents,
  imports: [
    ShoppingListRoutingModule,
    FormsModule,
    SharedModule,
    CommonModule
  ]
})

export class ShoppingListModule {
}
