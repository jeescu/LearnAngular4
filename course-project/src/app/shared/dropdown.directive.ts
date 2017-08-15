import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})

export class DropdownDirective {
  @HostBinding('class.open') open = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('click') toggleOpen(eventData: Event) {
    this.open = !this.open;
  }
}