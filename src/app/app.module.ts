import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import AppRoutingModule from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {DropdownDirective} from "./shared/dropdown.directive";
import {ShoppingListService} from "./services/shopping-list.service";
import {RecipesService} from "./services/recipes.service";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {ShortenPipe} from "./shorten.pipe";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from './auth/auth.component';
import {SpinnerComponent} from "./shared/spinner/spinner.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    PageNotFoundComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    ShortenPipe,
    AuthComponent,
    SpinnerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ShoppingListService,
    RecipesService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
