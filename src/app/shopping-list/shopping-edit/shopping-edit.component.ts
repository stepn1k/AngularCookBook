import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from "../../services/shopping-list.service";
import Ingredient from "../../shared/ingredient.model";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("form") slForm: NgForm;

  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
        this.editMode = true
      }
    )
  }

  onSubmit(subForm) {
    const form = subForm.value;
    const formIngredient = new Ingredient(form.name, form.amount);

    if (this.editMode) {
      this.shoppingListService
        .updateIngredient(this.editedItemIndex, formIngredient);
    } else {
      this.shoppingListService.addIngredient(formIngredient)
    }
    this.slForm.resetForm();
    this.editMode = false;
  }

  onClear() {
    this.slForm.resetForm();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
