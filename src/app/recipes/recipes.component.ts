import {Component, OnInit} from '@angular/core';
import Recipe from "./recipe.model";
import {RecipesService} from "../services/recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
  currentRecipe: Recipe;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipesService
      .recipeSelected
      .subscribe((recipe: Recipe) => {
        this.currentRecipe = recipe;
      })
  }

}
