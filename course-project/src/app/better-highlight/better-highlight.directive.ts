import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  // Using renderer as the better approach of accessing the DOM for directive (/ components)
  // unlike directing access to the element, it might have an error.
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // `setStyle()` 3rd .. args are flags
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
  }
  // binds to any property of an element
  // backgroundColor- instance var, when changed `@HostBinding will execute`
  @HostBinding('style.backgroundColor') backgroundColor: string;

  // listen an event mouseenter
  @HostListener ('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener ('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
