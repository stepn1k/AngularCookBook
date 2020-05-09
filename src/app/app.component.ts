import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isRecipesOpen: boolean = true;

  onMenuClick(state) {
    this.isRecipesOpen = state;
  }

}
