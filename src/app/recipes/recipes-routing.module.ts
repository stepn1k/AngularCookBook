import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../auth/auth.guard";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipesResolverService} from "./recipes-resolver.service";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: "", canActivate: [AuthGuard], component: RecipesComponent, children: [
      {path: "", component: RecipeStartComponent},
      {path: "new", component: RecipeEditComponent},
      {
        path: ":id", component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ":id/edit", component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {
}
