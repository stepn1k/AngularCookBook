import {Component, OnDestroy, OnInit} from '@angular/core';
import Recipe from "../recipe.model";
import {RecipesService} from "../../services/recipes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.subscription = this.recipesService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      });
    this.recipes = this.recipesService.getRecipes()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
