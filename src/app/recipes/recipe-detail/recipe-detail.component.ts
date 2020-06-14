import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipesService} from "../../services/recipes.service";
import Recipe from "../recipe.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  currentRecipe: Recipe;
  id: number;
  subscription: Subscription;

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      let recipe = this.recipesService.getRecipesById(this.id);
      if (!recipe) {
        this.router.navigate(["/not-found"])
      } else {
        this.currentRecipe = recipe;
      }
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
