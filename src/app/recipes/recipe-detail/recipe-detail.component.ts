import {Component, Input, OnInit} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() currentRecipe;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
  }

  addToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.currentRecipe.ingredients)
  }
}
