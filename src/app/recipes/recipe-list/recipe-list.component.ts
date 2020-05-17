import {Component, OnInit} from '@angular/core';
import Recipe from "../recipe.model";
import {RecipesService} from "../../services/recipes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipesService: RecipesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes()
  }


}
