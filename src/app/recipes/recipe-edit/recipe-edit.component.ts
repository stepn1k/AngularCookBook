import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService) {
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.id, this.editForm.value)
    } else {
      this.recipeService.addRecipe(this.editForm.value)
    }
    this.onCancel();
  }

  addIngredient() {
    (<FormArray>this.editForm.get('ingredients')).push(new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
    }));
  }

  deleteIngredient(id: number) {
    (<FormArray>this.editForm.get('ingredients')).removeAt(id);
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
              "name": new FormControl(ingredient.name, Validators.required),
              "amount": new FormControl(ingredient.amount,
                [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
          )
        }
      }
    }

    this.editForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "ingredients": recipeIngredients
    });
  }
}
