import Recipe from "../recipes/recipe.model";
import {Injectable} from "@angular/core";
import Ingredient from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable()

export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {
  }

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipesById(id) {
    return this.recipes[id]
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  rewriteRecipeList(recipesList: Recipe[]) {
    this.recipes = recipesList;
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsFromRecipeDetail(ingredients)
  }
}
