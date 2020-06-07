import Recipe from "../recipes/recipe.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import Ingredient from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";


@Injectable()

export class RecipesService {
  constructor(private slService: ShoppingListService) {
  }

  private recipes: Recipe[] = [
    new Recipe(
      'Spinach Gnocchi Soup',
      'Creamy spinach gnocchi soup with parmesan cheese and mushrooms is easy to make and comforting. It\'s ready in about 30 minutes',
      'https://images-gmi-pmc.edge-generalmills.com/a02cb571-d234-4e21-80c8-916e87a291ea.jpg',
      [
        new Ingredient('cups Baby spinach, packed fresh', 2),
        new Ingredient('sticks Celery', 2),
        new Ingredient('oz Cremini mushrooms', 16),
        new Ingredient('cloves Garlic', 3),
        new Ingredient('Onion, medium', 1),
        new Ingredient('Salt & pepper', 1),
        new Ingredient('tbsp Flour', 1),
      ]
    ),
    new Recipe(
      'Turkey Taco Sweet',
      'Turkey Taco Stuffed Sweet Potato recipe is a fantastic option when you need a quick dinner recipe. 226 calories and 5 Weight Watchers Freestyle',
      'https://carrotsncake.com/wp-content/uploads/2017/09/Turkey-Taco-Stuffed-Sweet-Potatoes.jpg',
      [
        new Ingredient('tbsp Flat-leaf parsley', 2),
        new Ingredient('Garlic cloves', 4),
        new Ingredient('tsp Oregano, dried', 1),
        new Ingredient('Sweet potatoes, medium', 2),
        new Ingredient('1/4 cup Tomatoes, canned', 1),
        new Ingredient('tsp Chili powder', 1),
        new Ingredient('tsp Olive oil', 1),
        new Ingredient('1/4 tsp Cumin, ground', 1)
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipesById(id) {
    return this.recipes[id]
  }


  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsFromRecipeDetail(ingredients)
  }
}
