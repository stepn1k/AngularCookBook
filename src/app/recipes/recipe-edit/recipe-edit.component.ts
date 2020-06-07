import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEditMode: boolean = false;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipesService) {
  }

  onSubmit() {
    console.log(this.editForm)
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEditMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "";
    let recipeDescription = "";
    let recipeImagePath = "";
    let recipeIngredients = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.recipeService.getRecipesById(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;

      if (recipe['ingredients']) {
        for (let ingredient of recipe['ingredients']) {
          recipeIngredients.push(
            new FormGroup({
              "name": new FormControl(ingredient.name),
              "amount": new FormControl(ingredient.amount)
            })
          )
        }
      }
    }

    this.editForm = new FormGroup({
      "name": new FormControl(recipeName),
      "description": new FormControl(recipeDescription),
      "imagePath": new FormControl(recipeImagePath),
      "ingredients": recipeIngredients
    });

    console.log(this.editForm.get("ingredients"))
  }
}
