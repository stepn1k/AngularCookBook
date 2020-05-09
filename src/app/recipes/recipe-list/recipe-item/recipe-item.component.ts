import {Component, Input, OnInit} from '@angular/core';
import Recipe from "../../recipe.model";
import {RecipesService} from "../../../services/recipes.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
  }

  onSelected() {
    this.recipesService.recipeSelected.emit(this.recipe);
  }
}
