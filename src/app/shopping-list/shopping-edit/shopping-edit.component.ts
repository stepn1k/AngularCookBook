import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import Ingredient from "../../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})

export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAddItem(event) {
    event.preventDefault();

    //create new ingredient
    this.shoppingListService.addIngredient(new Ingredient(
      this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value
    ));

    this.nameInput.nativeElement.value = "";
    this.amountInput.nativeElement.value = "";

  }

}
