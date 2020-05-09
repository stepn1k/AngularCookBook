import Ingredient from "../shared/ingredient.model";

export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Cucumber", 4)
  ];

  getIngredients() {
    return this.ingredients
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient)
  }

  addIngredientsFromRecipeDetail(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
  }

}

