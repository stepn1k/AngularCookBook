import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipesService} from "../../services/recipes.service";
import Recipe from "../recipe.model";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe;
  id: number;

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.currentRecipe = this.recipesService.getRecipesById(this.id)
    })
  }


  addToShoppingList() {
    this.recipesService
      .addIngredientsToShoppingList(this.currentRecipe.ingredients)
  }

  onEdit() {
    this.router.navigate(
      ["edit"],
      {relativeTo: this.route})
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"])
  }
}
