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
    ),
    new Recipe(
      'Spaghetti',
      'Turkey Taco Stuffed Sweet Potato recipe is a fantastic option when you need a quick dinner recipe. 226 calories and 5 Weight Watchers Freestyle',
      'https://static.1000.menu/img/content/37027/spagetti-s-tushenkoi_1564024332_1_max.jpg',
      [
        new Ingredient('Sweet potatoes, medium', 2),
        new Ingredient('1/4 cup Tomatoes, canned', 1),
        new Ingredient('tsp Chili powder', 1),
        new Ingredient('tsp Olive oil', 1),
        new Ingredient('1/4 tsp Cumin, ground', 1),
        new Ingredient('tsp Olive oil', 1),
        new Ingredient('1/4 tsp Cumin, ground', 1)
      ]
    ),
    new Recipe(
      'Borscht',
      'Turkey Taco Stuffed Sweet Potato recipe is a fantastic option when you need a quick dinner recipe. 226 calories and 5 Weight Watchers Freestyle',
      'https://herbalinfo.ru/wp-content/uploads/2018/05/Ukrainian_Borscht.jpg',
      [
        new Ingredient('tbsp Flat-leaf parsley', 2),
        new Ingredient('Garlic cloves', 4),
        new Ingredient('tsp Oregano, dried', 1),
        new Ingredient('Sweet potatoes, medium', 2),
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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsFromRecipeDetail(ingredients)
  }
}
