import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipesService} from "./recipes.service";
import {map, tap} from "rxjs/operators";
import Recipe from "../recipes/recipe.model";

@Injectable({providedIn: "root"})

export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,) {
  }

  storeData() {
    let recipes = this.recipeService.getRecipes()
    this.http
      .put('https://recipe-app-4d45b.firebaseio.com/recipes.json', recipes)
      .subscribe()
  }

  fetchData() {
    return this.http
      .get<Recipe[]>(
        "https://recipe-app-4d45b.firebaseio.com/recipes.json"
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        tap(recipe => {
          this.recipeService.rewriteRecipeList(recipe)
        })
      )
  }
}
