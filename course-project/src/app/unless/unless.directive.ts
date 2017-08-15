import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // it's still a property but a method, that can be called when property value changed.
  // using `set` to acts as a function. NOTE should be the same in selector name.
  @Input() set appUnless (condition: boolean) {
    if (!condition) {
      // create view of the template where it is put on.
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // removing anything of this DOM
      this.vcRef.clear()
    }
  }
  // two args from the constructor, when using `*` 1. templateRef, 2. View - Child
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
}
