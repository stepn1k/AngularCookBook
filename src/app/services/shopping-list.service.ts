import Ingredient from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Cucumber", 4),
    new Ingredient("Tomato", 6),
    new Ingredient("Butter", 1),
  ];

  getIngredients() {
    return this.ingredients
  }

  getIngredient(id) {
    return this.ingredients[id]
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient)
  }

  addIngredientsFromRecipeDetail(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
  }

  updateIngredient(ingredientIndex: number, updatedIngredient: Ingredient) {
    this.ingredients[ingredientIndex] = updatedIngredient;
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1)
  }


}

