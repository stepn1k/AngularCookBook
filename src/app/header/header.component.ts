import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  styleUrls: ['./header.component.scss'],
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  @Output() state: EventEmitter<boolean> = new EventEmitter();

  togglePage(event) {
    this.state.emit(event.target.textContent === "Recipes")
  }
}
