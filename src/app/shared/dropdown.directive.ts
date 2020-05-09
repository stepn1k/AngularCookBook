import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[appDropDown]'
})

export class DropdownDirective {
  isOpen: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  @HostListener("click") toggleOpen() {
    let dropdownMenu = this.el.nativeElement.lastChild;

    if (!this.isOpen) {
      this.renderer.addClass(dropdownMenu, 'show');
    } else {
      this.renderer.removeClass(dropdownMenu, "show");
    }
    this.isOpen = !this.isOpen;
  }

}
