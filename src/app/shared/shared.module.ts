import {NgModule} from "@angular/core";
import {DropdownDirective} from "./dropdown.directive";
import {ShortenPipe} from "../shorten.pipe";
import {SpinnerComponent} from "./spinner/spinner.component";
import {CommonModule} from "@angular/common";

const sharedComponents = [
  DropdownDirective,
  ShortenPipe,
  SpinnerComponent
];

@NgModule({
  declarations: sharedComponents,
  imports: [
    CommonModule
  ],
  exports: sharedComponents
})

export class SharedModule {
}
