import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../auth/auth.guard";
import {ShoppingListComponent} from "./shopping-list.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: ShoppingListComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRoutingModule {
}
