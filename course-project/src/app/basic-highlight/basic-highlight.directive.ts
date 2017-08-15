import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
 selector: '[appBasicHighlight]', // recognize as attribute using []
})

export class BasicHighlightDirective implements OnInit {
  // get access on the element where the element is placed on
  constructor(private elementRef: ElementRef) {
    // using modifier to make the elementRef available inside class (shortcut)

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    // changing style bg color of element
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}