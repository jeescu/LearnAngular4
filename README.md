# Learn Angular 4

A JavaScript Framework for creating Reactive Single Page Applications (SPA).

__Features__:
- TypeScript - A superset of js.

## Using the CLI
Tool set for creating, building and managing your angular app very simple.

Requires `Node.js`.
```bash
$ npm install -g @angular/cli
$ ng new my-app
$ cd my-app
$ ng serve
```

The generated bootstrap project is already equipped with some of configurations.
Check `.angular-cli.json` for details.

- **Test**: Using **Karma**, **Jasmine**, **Protractor**
- **Lint**: Using **TSLint**
- **Build**: **Webpack** (Internal)

## Getting Started
This section we're going to dive to the basics of angular!

__Key features__:
- [Components & Data binding](#what-is-databinding)

  App built up from components, Data binding: how to output data.
- [Directives](#what-are-directives)

  `ngModel` is a directive. We'll built our own directives.
- [Services & Dependency Injection](#using-services-and-dependency-injection)

  Different pieces of your app to communicate with each other to centralized code and mainly to manage the state of your application.
- [Routing](#changing-pages-with-routing)

  Management of different url's. For users it looks it switching to different pages, technically it remains in a single page.
- [Observables](#understanding-observables)

  Concept allowing to work with asynchronous code angular embraces it.

- [Forms](#forms)

  User forms. Key task of almost any application.
- [Pipes](#using-pipes-to-transform-outputs)

  Transforms the output to display on a template at runtime.
- [Http](#making-http-requests)

  Reaching out to a server which we can save out data.
- [Authentication](#an-introduction-to-guards)

  Manage authenticated user
- [Optimizations and NgModules](#using-modules-optimizing-an-angular-app)

  Performance and managing modules.
- [Deployment](#deployment)

  Serving to internet instead of local machine.
- [Animations](#animations) & [Testing](#basic-unit-testing)

### TypeScript
A superset to javascript. More features than Vanilla JS (e.g. Types, Classes, Interfaces, .. ).
Will be compiled to javascript by the CLI (`angular cli`).

### Style with Bootstrap
```
$ npm install --save bootstrap
```
Update `.angular.json` config and update `apps.styles`.
```js
"style": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css"
  "style.css"
]
```

## The Basics

### Module Introduction
Understanding angular, what happens on build time, runtime and page is loaded.

While running `ng-serve` the app will be hot reloaded (build the app and run again) when there is a code change.
The `index.html` is actually the file that served by the server, angular manipulates the content
what component to display.

`main.ts` bootstrap the app `module` then bootstrap the main/root `component` to view on html.

- Components - Build whole the application by composing components. Reusable
- Decorator - typscript features that allow you to enhance classes, elements in code.
Example using in component by adding `@` sign before class.

#### Creating a basic component: 
```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-server', // unique selector in html element.
  templateUrl: './server.component.html', // path to html file
  styleUrls: ['./server.component.css'] // paths to own styles
})

export class ServerComponent { }
```

### Using the created component:
Using the `AppModule`, bundle of functionalities of our complete app.
Angular doesn't know all of the components, we have to define it in AppModule.
```js
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent
  ]
  ...
})
```

Adding to a component (template). Use the unique selector like a html tag.
```html
<app-server></app-server>
```

### Creating components using CLI
This will create empty component class, template and the style. Also updates the AppModule to update it in `declarations`.
```
$ ng generate component componentName
$ ng g c componentName
$ ng g c componentName --spec false // add flag to prevent creating default test file

$ ng g c componentName/subComponent // creating component inside existing component
```

### Working with Component Templates
A template can be written directly to the component decorator by using the field `template` and value of html as string. Using backtick to allow multi-line string.
```js
@Component({
  template: `
    <app-server></app-server>
    <app-server></app-server>
  `
})
```

### Working with Component Styles
Component styles can be written also in component decorator by using field `style`.
```js
@Component({
  styles: [`
    h3 {
      color: blue;
    }
  `]
})
```

### Understanding Component Selector
Selectors should be unique in the whole app. By default angular take selector as html element `<app-servers>`.

Component selector can be used as an attribute or class to an element:
```js
selector: '[app-servers]'; // use as attribute. <div app-servers>
selector: '.app-servers'; // use as a class. <div class="app-servers">
```

### What is Databinding?
Communication between your Business Logic (ts) and Template (html). 
- Output data
  - String Interpolation: using `{{data}}`
  - Property Binding: use on element `[property]="data"`

- React to (User) Events
  - Event binding: `(event)="expression"` e.g onClickEvent
- Combination of Two: **Two-Way-Binding** `[(NgModel)]="data"`.

  React to events and output something ast the same time.

### String Interpolation
Using `{{}}` to output data. You can't add block expressions / modular inside.

Allows expressions: **ternary**, ***variable**, **hard-coded value**, **method**

### Property Binding
Dynamic html attribute / property, enclosing attribute in brackets `[]`. `[]` indicates to angular that we are using property binding that we want to dynamically find some property.
```js
[disabled]="allowNewServer"

[disabled]="!allowNewServer" // can also write not operator
```

### Property Binding vs String Interpolation
Output text or data use String Interpolation,
use property binding when you want dynamic element, change element behavior by attribute.

### Event Binding
Create method on class component and bind event to element.
```
(click)="onClick()"
// or etc..
(input)="onUpdateServerName($event)"
```
`$event` is a reserved variable for angular that get the events when fired.

Using two way binding will set automatic event handling to a state and pre-populated the element! output, set event and pre-populate itself.

__Important__: For Two-Way-Binding to work, you need to enable the `ngModel` directive. This is done by adding the `FormsModule`  to the `imports[]`  array in the AppModule.

### Combining all Forms and Databinding
Use two-way binding (using `ngModel`) to change and to update text input **value**, and use property binding in button to trigger the update and display status with the updated **value**.

### What are Directives?
Directives are instructions in the DOM. Components is an example of a directive but with a template.

__Example of directives__:
- `ngIf`
  Use it in element with '*', e.g. `<p *ngIf="boolean">`. Value should be only `true` or 'false'
  With asterisk it means this is a *structural directive* that able to change the DOM.

Enhancing `ngIf` with an Else condition using `ng-template` directive with a marker `#id`.
```html
<p *ngIf="serverCreated: else noServer">Created</p>
<ng-template #noServer>
  <p>No server</p>
</ng-template>
```

### Styling Elements Dynamically
Using `ngStyle`. This an attribute directive, unlike *structural directives*, *attribute directives* only change the element they where placed on.

`ngStyle` is directive name
using `[]` indicates that we want to bind some property to the directive.
if this element changes the `getColor()` will also called and changed (bound)

```html
<p [ngStyle]="{backgroundColor: getColor()}">
```

### Applying CSS Classes Dynamically with **ngClass**
Also bind to a property. Add css class `online` if server status is online.
value of online is the condition if we want to add this css class. We can define the css class from the css file (`styleUrls` in component) or inline styles in component (`styles: ['.online { color: white; }']`)  
```html
<p [ngClass]="{online: serverStatus === 'online'}">
```

### Outputting Lists with **ngFor**
A **Structural** directive. The value will be like a `for of` loop
```html
<app-server *ngFor="let server of servers"></app-server>
```
We loops the component from the number of `servers`. The `server` is the item of each element.

#### Getting the Index when using **ngFor**
We can the index of an item after `for of` expression. Aside from that we can directly display the `item` nd `index` to the DOM.

Example:
```html
<div *ngFor="let server of servers; let i = index">{{i}}</div>
```
### Creating a Model
Simply create a model class with properties.
```js
export class Recipe {
  public name: string;
  public description: string;

  constructor(name: string, desc: string) {
    this.name = name;
    this.description = desc;
  }
}

// typed recipes data.
recipe: Recipe
recipes: Recipe[]
```

## Debugging
### Understanding Error Messages
Using `browser dev tool` check `EXCEPTION` error.
### Debugging Code the Browser Using Sourcemaps
Using `browser dev tool` navigate to `sources` (browser's debugging tool ).
### Using Augury to Dive into Angular Apps
Tool that analyzes angular app, inspects component tree, ngModules, Route tree.

## Components and Databinding Deep Dive
### Splitting Apps to Components
Splitting into separate components to make it small and reusable.
### Property & Event Binding Overview
Binding to element properties like: `[disabled]=isAllowed`. And Event binding like: (input)="onClick"

### Binding to Custom Properties
When passing a data to a component.

When child component expects an `element` variable from parent:

1. Initialize the `element` var to the child component with defined type.
```js
export class childComponent {
  element: {type: string, name:string};

  constructor() { ..
}
```
2. And when passing the variable from parent component.
```html
<child-component *ngFor="let element of elements" [element]="element"></child-component>
```

3. Specify property of component to be accessible outside.
By default all properties of a component is only accessible to its own.

Explicitly expose property `element` to the world, by using decorator
```js
import { Component, OnInit, Input } from '@angular/core';

@Input() element: {type: string, name:string};
```

### Assigning an Alias to Custom Properties
By default adding decorator `@Input` to a property, the name itself will be exposed.
```js
@Input element; // exposed propert 'element': < ... [element]="elementItem">
```
Adding alias to a property is simple. Only by adding one argument to the `@Input` decorator.
```js
@Input('aliasElement') element; // 'element' will not work as properties, use 'aliasElement' property instead
// < ... [aliasElement]="elementItem">
```
But still this doesn't change how a component with the custom property access it.
```
{{element.name}} // element is still the property name accessible.
```

### Binding to Custom Events
This can be done by binding again the parent event method to property of child component.
```html
<app-child-component (recipeCreated)="onRecipeAdded($event)">
<!-- binds 'onRecipeAdded' of current component to app-child-component property (recipeCreated method -->
```

Using `EventEmitter` the generic type of Event we use in event properties and allows us to emit the event bound by the parent component.
```js
import { EventEmitter, Output } from '@angular/core';

@Output recipeAdded = new EventEmitter<{ name: string, description: string}>();
// using output decorator, since we are producing not receiving data.

onRecipeAdded() {
  this.recipeAdded.emit({ name: this.name, description: this.description })
}
```

### Assigning an Alias to Custom Events
Aliasing event properties is the same with variable properties.
```js
@Output('aliasRecipeAdded') recipeAdded new EventEm.. // use the alias property name when binding a method.
```

### Custom Property and and Event Binding Summary
`@Input()` decorator, Allows send data as property value.
`@Output()` decorator, Allows to emit event bound by parent component.

### Understanding View Encapsulation
- Styles: styles are encapsulated per component. Meaning it is only applied on its component not globally.
This is not the default behavior of browser but angular itself (cool).

How it's done? when the app is running, angular created unique attributes that will be use by the styles of your component automatically on build time.

How to make style global / change behavior? In `@Component` decorator we can add new property `encapsulation`.
```js
import { ... ViewEncapsulation } from '@angular/core';
@Component({
  ...
  encapsulation: ViewEncapsulation.None // the styles in this component will now be applied globally.
})
// ViewEncapsulation.Emulated, The default
// ViewEncapsulation.Native, Same with emulated result, that uses shadow DOM
```

### Using Local References in Templates
Assigning a unique identifier to an input that can be used later by event within template.
```html
<input type="text" #myInput />
<!-- so instead of using two-way binding we can also assign a local reference that will only be available on template. -->

<button (click)="onClick(myInput)">Click</button>
<!-- `#myInput` will be the input element itself.
Access it using: `myInput.value` in your `onClick` method. -->

<!-- onClick Method -->
onClick(myInput: HTMLInputElement) {
  console.log(myInput.value); // whatever the value of input is.
}
```

### Getting Access to the Template & DOM with @ViewChild
Giving direct access to an element from you ts file. Apart from local references w/c is only for the template.

```js
// .html file
// <input type="text" #myInputView>

// .ts file
import { ViewChild } from '@angular/core';

export class Component {
  @ViewChild('myInputInView') myInput: ElementRef; // A decorator that allows access to an input given the selector. 'ElementRef' is an angular element type.

  onClick() {
    console.log(this.myInput.nativeElement.value); // whatever the value is.
  }
}

// Don't manipulate DOM usng this
this.myInput.nativeElement.value = 'initial VALUE'; // Don't do this. Use string interpolation/ data binding instead!
```

### Projecting Content into Components with **ng-content**
By default when using component in an html (`<app-some-component></app-some-component>`), angular doesn't care whats inside the component's before and after tags

```html
<app-some-component>
  <div>Some content</div> <!-- Basically this content will be lost during render -->
</app-some-component>
```
In order to retain the content added inside the component, we need to add functionality on component's html by using a directive. We will use `ng-content` to get the contents inside of this component.

```html
// some.component.html
<div>
  <h1>Some Component</h1>
  <div>
    <ng-content></ng-content> <!-- Any contents that's been added while using this component will be placed here -->
  </div>
</div>
```

### Understanding the Component Lifecycle

Lifecyle Hooks / Phases:

1. _**ngOnChanges**_ - Executed right at the start and bound input property changes.
    - angular core: `OnChanges`
    - parameter `changes: SimpleChanges` from angular core. Listens to property changes

2. _**ngOnInit**_ - Once component initialized.
    - angular core: `OnInit`

3. _**ngDoCheck**_ - Called during change detection run (system that ng determines wether something change in the component, whether it needs something to a template), executed every time angular checks (triggering events).
    - Called whenever angular component changes state or reacted.
    - angular core: `DoCheck`

4. _**ngAfterContentInit**_ - Called after content (ng-content) has been projected into view.
    - angular core: `AfterContentInit`

5. _**ngAfterContentChecked**_ - Called every time the projected content has been checked.
    - angular core: `AfterContentChecked`

6. _**ngAfterViewInit**_ - Called after the component's view (and child views) has been initialized.
    - angular core: `AfterViewInit`

7. _**ngAfterViewChecked**_ - called every time the view (and the child views) have been checked.
    - angular core: `AfterViewChecked`

8. _**ngOnDestroy**_ - Called once the component is about to be destroyed.
    - angular core: `OnDestroy`

### Lifecycle Hooks and Template Access
Like using `afterViewInit` or `afterContentViewInit` you can use element values already that you can't do on `ngOnInit`.


```js
ngOnInit() {
  console.log(this.header.nativeElement.textContent); // empty
}

ngOnAfterViewInit() {
  console.log(this.header.nativeElement.textContent); // value is visible, view is rendered.
}
```

### Getting Access to **ng-content** with **@ContentChild**

```html
<!-- parent.component -->
<div>
  <child-component>
    <p #contentParagraph>Paragraph Title</p> <!-- get access to this element in content -->
  </child-component>
</div>
```
We can't use `@ViewChild` since the paragraph is not part of the view but in the content, instead we use:

```js
@ContentChild('contentParagraph') paragraph: ElementRef;

// to access the data on the content use hook:
onAfterContentInit() {
  console.log(this.paragraph.nativeElement.textContent); // 
}

```
Yes, the text content is empty when you try it to access with `OnInit` or `AfterViewInit`.

**Note**
You can direct assign a value for the `event property` instead of assigning another `fn` again:
```
<... (method)="myValue = $event">; // assign the value of event to the var directly
```
## Directives Deep Dive
Types of directives:
- **Attribute directives**: looks like a normal HTML attribute (possibly with databinding or event binding) - only affect the element they are added to.
- **Structural directives**: look like a normal HTML attribute but have a leading `*` (desugaring) - affect the whole in the DOM, elements get added / removed.
    - Can't have more than one structural directives in the same element.

### Creating basic attribute directive
- Create Directive
  ```js
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
      // like normal components, it can also of on init (instantiation)
      // changing style bg color of element
      this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
  }
  ```

- Add directive to module

  Like normal components, add directive to to ngmodule declarations (app module)
- Use in template
  ```
  <p appBasicHighlight>Style me with basic highlight directive</p>
  ```
### Using **Renderer** to build better Attribute Directive
- Using ng script to create directive. (Will automatically add to main module)
```
$ ng g d better-highlight
```
```js
import { Directive, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  // Using renderer as the better approach of accessing the DOM for directive (/ components)
  // unlike directing access to the element, it might have an error.
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // `setStyle()` 3rd .. args are flags
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }
}
```
More [info](https://angular.io/api/core/Renderer2) on using renderer

### Using HostListener to Listen to Host Events
Improving our better directive by changing the background interactively.
- Using @HostListener decorator to listen to certain DOM events and followed by function to execute.

  bg color of element will be transparent until you hover on it.
  ```js
  @HostListener ('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener ('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }
  ```

  ### Using HostBinding to bind to Host Properties
  Using HostBinding to bind directly all the elements property. Efficient when property value changed many times on directive.
  ```js
  export class BetterHighlightDirective implements OnInit {
    // Using renderer as the better approach of accessing the DOM for directive (/ components)
    // unlike directing access to the element, it might have an error.
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
      // `setStyle()` 3rd .. args are flags
      // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    }
    // binds to any property of an element
    // backgroundColor- instance var, when changed `@HostBinding will execute`
    @HostBinding('style.backgroundColor') backgroundColor: string = 'blue';

    // listen an event mouseenter
    @HostListener ('mouseenter') mouseover(eventData: Event) {
      // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
      this.backgroundColor = 'blue';
    }

    @HostListener ('mouseleave') mouseleave(eventData: Event) {
      // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
      this.backgroundColor = 'transparent';
    }
  }
  ```

### Binding to Directive Properties
Using @Input to get the values from element attributes.
```js
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
```
Use it in element:
```html
<!-- directive properties should be in brackets, and value should be string-syntax like in js. -->
<p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">Style me with better highlight directive</p>
```
But we can improve writing property binding for directive: Removing brackets and value will be normal.

**Note** this can be confusing to directives. (optional)
```html
<p appBetterHighlight defaultColor="yellow" highlightColor="red">Style me with better highlight directive</p>
```

### What happens behind the scenes on Structural Directive
Why we need the `*` to indicate as a Structural Directive ?
Because it will be transform to something else where we end up into normal property binding.

Using `ng-template` (like the real content behind the scene using `*`). Now the directive acts like o normal property.
So structural directives has to be rendered with their own directives (component) behind. transforms to it's ng-template syntax.
```html
<ng-template [ng-if]="!onlyOdd">
```

### Building a Structural Directive
  ```js
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
  ```
Use it in template as a normal structural directive:
  ```html
  <span *appUnless="false">Using 'unless' directive</span>
  ```

### Understanding **ngSwitch**
Can also be use whe you have too many `ngIf` conditions.

```html
<div [ngSwitch]="value">
  <span *ngSwitchCase="5">value is 5</span>
  <span *ngSwitchCase="10">value is 5</span>
  <span *ngSwitchDefault>value is default</span>
</div>
```

## Using Services and Dependency Injection
**Services**

Like a centralized business logic that can be reuseable across components.

### Creating A Service
Create normal class with methods, and use it on components
### Injecting the Service into Components
**Dependency Injector**:

A class should depend on. Injects instance of the class (service) to our components.
- Create Service.
- Import Service to Component.
- Add `providers` to component decorator and add Service Name on the list.
  This will tell angular that we are injecting a service that it needs to initialize.
- Use in Component constructor (declare as component variable)
  ```
  constructor(private myService: MyService) {}
  ```
  Use thie variable anywhere in the class.
  ```
  this.myService.doStuffs();
  ```

### Creating Data Service
Create a service with reference data and methods.

_Hierarchical Injector_

Dependecy injector is a hierarchical injector, means if you have added your services to difference components will recieve different instance. So if we provide a service to a higher module (main module / main component)  instance of the service will be available to our whole app.

- AppModule: Same instance of Service is available **Application-wide**
- AppComponent: Same instance of Service available for **all Components** (but **not for other services**)
- Any other Component: Same instance of Service is available for **the Component and all its Child Components**

**How many instances should you have in your service ?**

Depends. If your `child components` data (from a service) depends on single instance then you should only add `service` as one of the _providers_ on the `parent component` and remove from children. 

If your service doesn't own any data that you'll only have to use it's methods etc. It's ok to add this to provider, but it's too redundant if the parent component added it already (remove it anyway).
```
@Component({
  providers: [MyService]
```

### Injecting Services to Services
In order to do this, we need to add the involved services to the app module (top in hierarchy injection). You can think it like by directly adding the service to a service (import and add to constructor) but it's not. We need to define some metadata to service just like on directives, components (@Directive, @Component).

To do this:
Use `Injectible` on service, only add this if you expect that something is to be injected.
```
import { Injectible } from '@angular/core';
import { OtherService } from './other.service'

@Injectable()
export class MyService {
  // use it like you normally do on components / directives
  constructor(private otherService: OtherService) {}

  foo() {
    this.otherService.doStuffs();
  }
}
```

### Using Services for Cross-Component
We can subscribe to an EventEmitter as one of the concept of observables. We can get updates from a service when another component changed something. Example:

Adding event emmitter on service
```
// MyService
statusUpdated = EventEmitter<string>();
```
On component 1 you can emit this event.
```
this.myService.emit(status);
```
And on component 2, add subscription to cnstructor.
```js
constructor(private myService: MyService) {
  // callback called when myservice instance variable `status updated` is emitted.
  this.myService.subscribe((status: string) => {
    console.log('status changed', status);
  })
}
```

## Changing Pages with Routing
Switch pages when browser's url changed.

### Basic Usage
__Adding routes to our App Module__
```js
import { Routes, RouteModule } from '@angular/router';

const appRoutes: Routes = [
  // no need for '/'
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  ...
  imports: [
    ...
    RouteModule.forRoot(appRoutes) // add the module and app routes as arg, will use our defined routes.
  ]
})
```
__Add angular directive target element root for routes.__

Shows the component specified from the routes.
```html
<route-outlet></route-outlet>
```
__Use Router Link directive to navigate to another route (using `<a>` tag)__

This prevents reloading the app (normal behavior)
```html
<a routerLink="/">Home</a>
```

__Using Router link with additional paths__
```html
<a [routerLink]="['/users', '1', 'Anna']>Home</a> // `/users/1/Anna`
```

__NOTE:__
When using Router Link, you can remove the the leading slash of route value. But this specifies as relative to the current route. So when you are already in '/someRoute', and you specified a link like 'otherRoutes' under this component it will result in the url as '/someRoute/otherRoutes', and it can be an error if this doesn't exist.

You can also access routes like folders.
```html
<!-- go back one previous slash and navigate to '/servers' -->
<a routerLink="../servers">Home</a>
```

### Styling Active Router Links
Use a directive to set `<a>` to `active` class. Use `routerActiveLink` and value is the class name
```html
 <!-- // sets to class active if in the current route -->
 <li role="presentation" routerLinkActive="active"><a routerLink="/">Home</a></li>
```
__IMPORTANT__
Using `routerLink`, routerLink check routes by string on url if available. So links with '/qwer' will also detects for home `'/'`. We can use another directive `routerLinkActiveOptions` to define exact route.
```html
<!-- // changed default behavior -->
 <li role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"><a routerLink="/">Home</a></li>
```

### Navigating Programmatically
__Add Router Service to component__
```js
  constructor(private router: Router) { }

  onLoadServers() {
    this.router.navigate(['/servers']); // same formats for `routerLink`
    // unlike routerLink, navigate doesn't know what's the current route. So relative paths. always points from the root.
  }
```
To do relative paths, like accessing folders: Add the route service and modify the navigate args.
```js
  constructor(private router: Router, private route: ActivatedRoute) { }

  onLoadServers() {
    this.router.navigate(['/servers'], { relativeTo: this.route }); // noe angular knows whats the current activated route, and navigate will refer on it. 
  }
```

### Passing Parameters to Route
By adding parameter in route to be dynamic.
```js
// `:id` ca be any value
{ path: 'users/:id', component: UserComponent },
```
### Fetching Route Parameters
Currently loaded route is a js object with a lot of metadata about it.
Do this by getting the snapshot.params object in active route service.
```js
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
  }
```
### Fetching Route Parameters Reactively
Navigating to the same url from the same component, angular doesn't reinitialize the component,
In order to get the changes of the parameters in the route we need to listen from the changes.
```js
import { Params } from '@angular/router';

ngOnInit() {
  // params is an observable that listens to this current route params changes.
  this.route.params.subscribe((params: Params) => {
    // now we can update the object here.
    this.user.id = params['id'];
  })
}
```
__NOTE:__

Route Observables: For practice we can destroy the subscription of the params.
```js
import { Subscription } from 'rxjs/Subscription'
...
  this.paramsSubscription: Subscription;
  ngOnInit() {
    this.route.params.subscribe(() => { .... });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
```

### Passing Query Parameters and Fragments
Adding query params from the element.

`queryParams` and `fragment` is an another bindable property of router link directive.
```html
<a [routerLink]=['/servers', 1] [queryParams]="{allowEdit: 1} fragment="loading">
// `/servers/1/?allowEdit=1#loading`
```
Applying programmatically:
```js
this.router.navigate(['servers', id, 'edit'], {queryParams: { allowEdit: 1 }, fragment: 'loading'});
```
### Retrieving Query Parameters and Fragments
Like retrieving route params.
```js
console.log(this.route.queryParams);
console.log(this.route.fragments);

//to make it reactive use the observables.
this.route.queryParams.subscribe(() => {});
this.route.fragments.subscribe(() => {});
```
### Setting up Child (Nested) Routes
Add `children` routes to a route.
```js
{ path: 'users', component: UsersComponent, children: [
    {path: ':id', component: UserComponent } // '/users/:id' 
  ]
}
```
More importantly add a directive `router-outlet` on the parent component where child route component can be injected.
```html
<!-- // UserComponent -->
<div>
  <h2>Users</h2>
  <router-outlet></router-outlet> // This where child route of this component is shown.
</div>
```

### Configuring the handling of the Query Parameters.
Using the relative path. If you want to preserve the current queryParams
```js
  // we're in the relative path..
  this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
```
### Redirecting and Wildcard Routes.
Whenever a route is not available. Let's setup a route that handles not found route.
```js
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
```
Using double `*` (wildcard) as any other routes that is not defined. This should at the last route defined (the order in routes is very important as it's read from top to bottom).

We also use `redirectTo` property, this will redirects to another route that has a defined component (`PageNotFoundComponent` in our case).

### Outsourcing the Route Configuration
We can separate the route configurations from the app module to its own (best approach), like creating a new file `app-routing-module`. Use `NgModule` from angular, do imports and exports the module.
```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
```

### An Introduction to Guards
Protect some of our routes.
**Protecting routes with `canActivate`**
**Control leaving the route with canDeactivate**

### Using `canActivate` and `canActivateChild`

Create service named `AuthGuard` Service and use `CanActivate from angular`
```js
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  // using the fake auth service.
  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then((authenticated: boolean) => {
        if (authenticated) {
          return true
        } else {
          this.router.navigate(['/']);
        }
      }
    )
  }
}
```
Using this Auth guard service to routes. First add those services to providers.
```js
{ path: '/', canActivate: [AuthGuard], component: SomeComponent }
```
**Protecting Child (Nested) Routes with `canActivateChild`**

Using the `canActivateChild` in AuthGuard Service.
```js
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  // using the fake auth service.
  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(....

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(state, route); // reuse `canActivate` method, its the same implementation  
  }
}
```
Use it in routes.
```js
{ path: '/', canActivateChild: [AuthGuard], component: SomeComponent }
```
__NOTE:__ `canActivate` secures the main route, whereas `canActivateChild` secures only the child routes and not the main route.

### Controlling Navigation with `canDeactivate`
To control whether we are allowed to leave a route.
See `router-start` example files.

### Passing Static Data to Route
When you have a generic component that receives static data.Use in route:
```js
{ path: '/some', component: SomeComponent, data: { message: 'test message' } }
```
And access to `SomeComponent`
```js
constructor(private route: ActivatedRoute) {}
ngOnInit() {
  this.message = this.route.snapshot.data['message']
}
```

### Resolving Dynamic Data with resolve Guard
Create a route resolve service w/c gets the id and return the data.
```js
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ServersService } from '../servers.service';
import { Observable } from 'rxjs/Observable';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}
```
Apply to NgModule providers and use in route:
```js
{ path: ':id', component: ServerComponent, resolve: { server: ServerResolver }},
```
In the component you can get the data through observable again.
```js
ngOnInit() {
  this.route.data.subscribe((data: Data) => {
    this.server = data['server']; // will be available in data object
  })
```

### Understanding Location Strategies
By default when app is deployed to server, accessing to new route the server will handle it and not the angular. To solve this, we need to use the old way. By using `#` on on routes (means server must ignore leading '#' and let our app handles it).
```js
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})
```

## Understanding [Observables](http://reactivex.io/documentation/observable.html)
In ReactiveX an observer subscribes to an Observable. Then that observer reacts to whatever item or sequence of items the Observable emits. This pattern facilitates concurrent operations because it does not need to block while waiting for the Observable to emit objects, but instead it creates a sentry in the form of an observer that stands ready to react appropriately at whatever future time the Observable does so.

EXample using `create`
```js
const myObservable = Observable.create((observer: Observer<string>) => {
  setTimeout(() => {
    observer.next('first package');
  }, 2e3)
  setTimeout(() => {
    observer.error('first package');
  }, 4e3)
  setTimeout(() => {
    observer.complete('first package'); // when the observable is completed, it's dead.
  }, 6e3)
  setTimeout(() => {
    observer.next('first package'); // will never be called
  }, 7e3)
});

this.mySubscription = myObservable.subscribe(
  (data: string) => {}, // onNext
  (data: string) => {}, // onError
  (data: string) => {}, // onCompleted
)
```
__NOTE:__ It is necessary to unsubscribe an observable when it cannot be completed otherwise will lead to memory leak.

We can use `OnDestroy` lifecycle hook on the component and call unsubscribe. Even though angular's observables already handle themselves, it is a good practice we unsubscribe our own.
```js
ngOnDestroy() {
  this.mySubscription.unsubscribe();
}
```

### Using [Subjects](http://reactivex.io/documentation/subject.html) to Pass AND Listen to Data
Instead of using event emitters, we can use `Subject` from 'rxjs/Subject'. Subject is already an observable and observer.

Create a sample service.
```js
import { Subject } from 'rxjs/Subject';

export class UsersService {
  userActivated = new Subject();
}
```
Add to providers and inject to a component.
```js
onClick() {
  this.usersService.userActivated.next(this.id);
}
```
And from the other component, use the observer.
```js
this.usersService.userActivated.subscribe((id: number) => {
  // the id, we pass from `onNext`
  this.id = id; // now updates the component var and rerender.
})
```
### Understanding Observable [Operators](http://reactivex.io/documentation/operators.html)
Transforms data you receive to something else and still stay inside observable. To do this, add this operators as chain of your observable.
```js
const myObservable = Observable.interval(1000)
  .map((number: number) => data * 2); // transforms the response number, 

myObservable.subscribe((number: Number) => {
  console.log(number); // already transformed number
})
```

## Forms
Offers two approaches when handling forms
1. __Template-Driven__:
Setup the form in the template and angular will automatically infer wc control / input has. Infers `Form Object` from the DOM
2. __Reactive__:
define your structure of the form in `ts`, and setup the template and you manually connect it with control.

### Template-Driven Approach
Angular tracks the state in the form when we `ngForm` as value of reference.

#### Registering the controls
Add `ngModel` and defined the name on the input.
```html
<input
  id="username"
  type="text"
  ngModel
  name="username"
>
```
#### Submitting and Using the Form
Use event directive `ngSubmit` on `form` element, 
and use a reference variable in element `#form`.

To get the form object automatically from, we will use `"ngForm"` as the local reference's value. This tells angular that give access to the form that created automatically.

```html
<form onsubmit="onSubmit(f)" #f="ngForm">
```
`f` value by default is an event of the whole form html by defining the value to `ngForm` of reference, it will change to `NgForm` object.

#### Accessing form with `@ViewChild`
Alternative way of getting form object.
Using the local reference of the form in `@ViewChild` declaration
```js
// 'f' local reference
@ViewChild('f') signupForm: NgForm;

...
 console.log(signupForm); // NgForm object
```

#### Adding Validation to check User Input
Using built-in directive validators. `required`, `email` [etc](https://angular.io/api/forms/Validators). per input. It tracks in form and per control level validation. Angular dynamically adds classes on each input depending on its state ('ng-valid', 'ng-invalid', 'ng-touched') etc. We can use this classes to style our inputs (taking advantage to the state).

Additionally, we might also want to enable HTML5 validation (by default, Angular disables it). We can do so by adding the `ngNativeValidate`  to a control in your template.

#### Outputting Validation Error Messages
Adding a local ref for an input and exposed ng directive `ngModel` to get the state object of an input.
```html
<input
...
  #email="ngModel"
>
<span class="help-block" *ngIf="email.invalid && email.touched">Please enter a valid email!</span>
```
#### Set Default Values with `ngModel` Property Binding
We can use `ngModel` with no event binding (one way binding).
```html
[ngModel]="defaultValue"
```
#### Using `ngModel` with Two-Way Binding
If we want to instantly output the changes of an input, like track it.
```html
<input [(ngModel)]="firstName"><input>

<p>{{ firstName }}</p>
```

#### Grouping Form Controls
By wrapping your related inputs by an element and use directive `ngModelGroup` and assign it with `value`. The `value` here will be the `key` and related inputs will be the value as object.
```html
<div ngModelGroup="userData">
  <input></input>
  <input></input>
</div>
<input name="question"></input>
``` 
The `NgForm` value will be:
```
{
  userData: { .. },
  question: ""
}
```
#### Handling Radio Buttons
Using `ngFor` to display radios.
```
genders = ['male', 'female']
```
```
<div class="radio" *ngFor="let gender of genders" >
  <label>
    <input
      type="radio"
      name="gender"
      ngModel
      [value]="gender"
    >
    {{ gender }}
  </label>
</div>
```
We can also set the default value of this by using `ngModel` in one way bind.
eg. `[ngModel]="defaultGender"`

#### Setting and Patching Form Values
Setting the value of NgForm object during event.
```js
// object value should be the same from the form structure
this.signupForm.setValue({
  key: "value"
})
```
or set a specific value (patch, do not override other values). 
```js
this.signupForm.form.patchValue({
  userData: {
    username: 'any'
  }
})
```

#### Using Form Data
Extracts the data from form object: 
```js
this.signupForm.form.value
```

#### Resetting Form
Use `reset` method from form object. Not only the values but it's whole state (classes, events etc..). 

__NOTE:__ We can also specify the fields on what to reset.
```js
this.signupForm.reset();
```

### Reactive Approach
Configure form in greater detail and create programmatically in `ts`. We all do the template on html but not the logic (validations, initial values, form object)

From the **App Module**, we will not be using `FormsModule` instead we used the module `ReactiveFormsModule` from `@angular/forms` also.

In the `ts` file, starts declaring our form using the `FormGroup`.
```ts
signupForm: FormGroup;
``` 

On `ngOnInit`, intialize the form.
```ts
ngOnInit() {
  this.signupForm = new FormGroup({})
}
```
**Controls** are the key value pairs (field name / group name and it's value) as argument of the **FormGroup**

__NOTE:__ Use strings on keys to keep them from minification.

Start creating our form controls on each fields.
```ts
this.signupForm = new FormGroup({
  'username': new FormControl(null);
})
```

And on our form in template we have to assign the signupForm in `ts`. Use `formGroup` directive (property bind) and value will be the form.

We also need to verify / synchronize which control of which input connected on the template. Use `formControlName` directive on the input and the key (static string) of the control.

```html
<form [formGroup]="signupForm">
  ...
  <input 
    formControlName="username"
    [formControlName]="'username'" <!-- or use property the value will be in ts -->    
  >
```

#### Adding Validations
The second argument of the FormGroup are the validators. Don't invoke the validator directly, angular will call the method when input changed. Validators can be also in array
```ts
this.signupForm = new FormGroup({
  'username': new FormControl(null, Validators.required);
  'email': new FormControl(null, [Validators.required, Validators.email]);
})
```

#### Getting Access to Controls
Get access from the form to show error messages. Use the `get` method,
```html
<!-- from each input -->
<span 
  *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"
  class="help-block">
Please enter a valid username!</span>

<!-- for the whole form -->
<span 
  *ngIf="!signupForm.valid && signupForm.touched"
  class="help-block"> Please enter a valid data!</span>
```

#### Grouping Controls
We can nest the value of **FormGroup** with **FormGroup**s, this will allow to nest our controls.
```ts
this.signupForm = new FormGroup({
  'userData': new FormGroup({
    'username': new FormControl(null)
    'email': new FormControl(null)
  });
  'gender': new FormControl('male')
});
```
Changing the structure of the form from `ts` will break the `form`  in template. We need to synchronize the structure same from the `ts`. Add a form group in you form
```html
<div formGroupName="userData">
  <input name="username"...>
  <!-- we need to update the accessing of data on displaying the error -->
  <span *ngIf="signupForm.get('userData.username').valid ... ">Please ..</span>
  <input name="email"...>
</div>
``` 

#### Arrays of Form Controls (`FormArray`)
Adding control with array value and displaying in html dynamically.
```ts
ngOnInt() {
  this.signupForm = new FormGroup({
    ...
    'hobbies': new FormArray([]) // no item as default
  })
}
// add an item of the form. will add dynamic input on the template (if set)
onAddHobby() {
  const control = new FormControl(null, Validators.required);
  (<FormArray>this.signupForm.get('hobbies')).push(control);
}
```
Same as adding formGroup and formControl names, use the index as the control name since it's dynamic
```html
<div formArrayName="hobbies">
  <h3>Your hobbies</h3>
  <button class="btn btn-default" type="button" (click)="onAddHobby()">Add Hobby</button>
  <div
    class="form-group"
    *ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"
    >
    <input type="text" class="form-control" [formControlName]="i">
  </div>
</div>
```
#### Creating Custom Validators
Since validators are just functions, add your custom validator in the `FormControl` 2nd argument.
You may need `bind` here if the validator is using the component context (will be invoke by angular and context will not be the same).

```ts
  this.signupForm = new FormGroup({
    'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)])
  });
...
// returns object when invalid, otherwise (null) valid.
forbiddenNames(control: FormControl): {[s: string]: boolean} {
  if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
    return {'nameIsForbidden': true};
  }
  // valid
  return null;
}
```

#### Using Error Codes
Accessing errors from controls to display specific validation errors.

Access the `errors`:
```
signupForm.get('userData.username').errors['errorCodeName'] // returns boolean
```
Usage on input:
```html
<!-- Check if input is invalid after touched -->
<span *ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched" class="help-block">
  <!-- Specify the error message to display by determining what error code is available -->
  <span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">              
    This field is invalid!
  </span>
  <span *ngIf="signupForm.get('userData.username').errors['required']">              
    This field is required!
  </span>
</span>
```

#### Creating a Custom Async Validator
Third argument of a `FormControl` is for **Async Validator/s**.

```ts
  this.signupForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
  });

  // ...
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      // simulates delay
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500)
    });
  }
```

#### Reacting to Status or Value Changes
Hooks, if we want to listen for the state changes of the form.
```ts
// when all values of the form changes
this.signupForm.valueChanges.subscribe((value) => {
  console.log(value) // Form values
})valuesvalues

this.signupForm.statusChanges.subscribe((status) => {
  /**
   * 'status' values could be:
   * INVALID, when one of the form fields are invalid
   * VALID, form is valid
   * PENDING, form is waiting for response of async validations.
   */
  console.log(status) ;
})
```

## Using [Pipes](https://angular.io/guide/pipes) to transform Outputs
Built in feature to transform some output in your template.

Ex: Transforming username string, without affecting the original value.
```html
<p>{{ username | uppercase }}</p>
```

### Parametrizing pipes
Add a colon and the parameters
```html
<p>{{ createdAt | data:'fullDate'  }}
```

### Chaining Multiple Pipes
Just add another pipe after pipe. Parsed from left to right
```html
<p>{{ createdAt | data:'fullDate' | uppercase  }}
```

### Creating Custom Pipe
Create file `shortine.pipe.ts`.
```ts
import { PipeTransform, Pipe } from "@angular/core";
// add decorator to define it is a pipe, to be used on template.
// Don't forget to add this on app module declaration
@Pipe({
  name: 'shorten',
})
// use PipeTransform interface and use transform method
export class ShortenPipe implements PipeTransform {

  transform(value: any) {
    if (value > 10) {
      return value.substr(0, 10) + ' ...';
    }
    return value;
  }
}
```

### Parametrizing a Custom Pipe
Add second param as argument on the pipe. Second arg and and so on are arguments of your pipe
```ts
  transform(value: any, limit: number) {
    if (value > limit) {
      return value.substr(0, limit) + ' ...';
    }
    return value;
  }
```
```html
<p>{{ title | shorten:6 }}</p>
```

### Creating a Filter Pipe
Pipes can be also used for filtering lists.

Ex: Getting item which corresponds from the search string.
```ts
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filteredString: string, propName: any) {
    if (value.length === 0 || filteredString === '') {
      return value
    }

    const resultArray = []
    for (const item of value ) {
      if (item[propName] === filteredString) resultArray.push(item)
    }

    return resultArray;
  }
}
```

Supposed you have a two way bound input on a component property `filteredString`.
```html
<!-- Only show list of servers with status base on `filteredString` -->
<div *ngFor="let server of servers | filter:filteredString:'status' ">
  <p>...</p>
</div>
```

### Pure and Impure Pipes
Pure pipes returns a copy of an object. Unpure pipes returns the reference of an object. Use specific type of pipe.

Will refrence the original object, once original is updated the filtered data can be updated too.
```ts
@Pipe({
  name: 'filter',
  pure: false, // default true
})
```

### Understanding the "async" pipe
Async pipes handles async properties on component
```ts
appStatus = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('stable')    
  }, 2e3)
})
```
```html
<!-- Displays value value after 2 sec -->
<p>{{ appStatus | async }} </p>
```

## Making Http Requests
Using service as where we can centralize the http requests.


__Service__:
```ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class ServerService {
  // inject http service, to enable send requests
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    // api url and data
    // this is an observable instance so we can subscribe to this method
    return this.http.post('apiUrl', servers);
    // once the response has return angular will clear this observable inst.
  }
}
```
__Component__:
```ts
ngOnInit() {
  // this is an http post, listen when response is return.
  this.serverService.storeServers.subscribe(
    (response) => {},
    (error) => {}
  )
}
```

### Adjusting Request Headers
Configuring own header on a request.
```ts
import { Http, Headers } from '@angular/http';
//...
const headers = new Headers({ 'Content-Type': 'application/json' });
return this.http.post('apiUrl', data, { headers: headers })
```

### Sending Get Requests

__Service__:
```ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class ServerService {
  // inject http service, to enable send requests
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    // api url and data
    // this is an observable instance so we can subscribe to this method
    return this.http.post('apiUrl', servers);
    // once the response has return angular will clear this observable inst.
  }

  getServers() {
    return this.http.get('apiUrl');
  }
}
```
__Component__:
```ts
import { Response } from '@angular/http'
//..
onGet() {
  // observable and automatically unsubscribe
  this.serverService.getServers.subscribe(
    (response: Response) => {
      console.log(response.json) // object
    },
    (error) => {}
  );
}
```

### Transforms Responses Easily with Observable Operators (`map()`)
From `rxjs/Rx`.
```ts
// Service

// adding this import unlocks all operators
import rxjs/Rx';

  getServers() {
    return this.http.get('apiUrl')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
  }
```
Now using this in Component will be easier.
```ts
this.serverService.getServers.subscribe(
  (servers: any[]) => {
    console.log(servers); // expected list
  }
)
```

#### Catching Http Errors
```ts
// Service
import rxjs/Rx';

  getServers() {
    return this.http.get('apuUrl')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      ).catch( // catch http error
        (error: Response) => {
          return Observable.throw(error) // should return observable since we subscribed and expects an error.
        }
      )
  }
```

### Using the "async" Pipe on Http Request
async pipes can work on observables too.
```ts
appName = this.serverService.getAppName.subscribe((name: string) => {
  return name;
});
```
```html
<p>{{ appName | async }}</p>
```

## Using Modules & Optimizing an Angular App
About modules and how to optimize app with modules. Increase performance, decrease file size and restructure code in better / easy to maintain way.

### The idea behind:
Module makes app your app, what your app consist of. What components, directives etc. do you want to use.
Defines how our looks like.

### Understanding Feature Modules
Building your Feature Modules. Optimize App Module by separating features from the app as another module to be use by app module.

__Recipes__ as Feature:
Moving related-recipe components to it's own module and still import it to main module.
Services that is used across modules (whole app) will have to remain to get access of the same instance.

__NOTE:__
Even if a service was moved from the main module, it would still work to other dependents. All modules at application lunch will be merged into ONE root INJECTOR. (but in most cases you do not need to do this)

### Using `CommonModule` as import from your Optimized Modules
It gives you access common directives to your component. `ngIf`, `ngClass` etc. Route modules will be imported from their own feature modules and imported in app module.

`BrowserModule` should use only on main module. Basically contains `CommonModules`.

__NOTE:__
You must not declare com, pipes / directives in more than one module. You can import the same module into module also services but you **MUST NO** duplicate your declarations!

__RULE:__
In your routing application, you must only use `.forRoot` in app module. You will use `forChild` for your other module dependencies. Add your feature route to feature module.

__NOTE:__
Importing modules with routes in app module should be oredered. Child routes should come before root routes. So root routes will not interfere for what is already defined in child routes. The problem here, if you have a wildcard route that redirects to `/`, you might be redirected to home.

### Understanding Shared Modules
Something that is to be used / shared across different modules. Example directives.

Typically, you only have one shared module in you application.

### Understanding Lazy Loading
__Module and Routing (Lazy Loading)__
What if we loaded codes that will never be visited by user (too heavy code on load). Let's load the module only when it is needed!

Using the **Routing** while we lazy load the module
```ts
// app-routing.module.ts
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
```
Specify the `route` and relative path of the `module` with the `module name`. On the recipes module routing, we can now set the route path to `''` because it is already defined in app route.

**In Action**: When the route is visited, app will request to download a **chunk** of code.

### Protecting Lazy Loaded Routes with `canLoad`
You can add canActivate to the lazy loaded routes but that of course means, that you might load code which in the end can't get accessed anyways. It would be better to check that **BEFORE** loading the code.

You can enforce this behavior by adding the `canLoad`  guard to the route which points to the lazily loaded module:
```ts
{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuard] }
```
Implement `canLoad` interface on `AuthGuard`
```ts
  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    return this.permissions.canLoadChildren(this.currentUser, route);
  }
```

### How Modules and Services Work Together
Angular creates a **Root Injector** from the app module and other feature modules loaded at *Application Lunch*. If a service was injected also injected to a service it will be instead created a one instance only in **Root Level**

Even though the *Lazy Loaded Feature Module* is loaded a later point of time, it will use the **Root Level**.

Other case: Lazy Loaded Module own Service. Angular will create a new instance of injector **Child Injector** (it has it's own instance).

Shared Module case: If this module uses service that is also used on *Lazy Loaded Module*, it will still create a new instance and uses the **Child Injector**.

__IMPORTANT:__
Don't provide *Services* in Shared Modules. Expecially not, if you plan to use them in Lazy Loaded Modules!

### Understanding Core Module
Some components, directives are only applicable on the root module and it can't be used by other modules.

Create a new Module for cores and use it from the app module.

### Restructuring Services to use the Child Injector
We can the services in the app providers to core providers. This will use the **Child Injector** but still uses the same instance across feature dependents.

Note: Use / import services / guards to modules that uses it. :)

### Using Ahead-of-Time Compilation
Two types of Compiling code:
1. **Just-in-Time Compilation**: Development -> Production -> App Downloaded in Browser -> *Parses & Compiles*
2. **Ahead-of-Time Compilation**: Development ->  *Parse & Compiles* -> Production -> App Downloaded in Browser.

**Advantages of AoT Compilation**

- *Faster Startup*: Parsing & Compiling doesn't happen in Browser.
- *Template get checked* during development.
- *Smaller File Size* as unused feature can be stripped out and the *Compiler* itself isn't shipped.

Building and using AoT for prod.
```bash
ng build --prod --aot
```

### Preloading Lazy Loaded Routes
Using lazy loading yet still preloaded the code. While the initial code is downloaded, lazy loaded modules are preloaded. :D sneaky.

In your app route:
```ts
RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
```

## Deployment
Static website hosting requires index.html path entry point to be rendered on browser.

Server side rendering should be configured to serve angular routes. Return `index.html` for any routes aside from your server route identifier name `/api` etc.

## Animations
### Triggers and State
Triggers and State are imported from angular, use trigger to define what state to listen, and use atleast two states how the defined state behaves. 3rd and 4th index will be the animation (from normal to something vv). When you want to set both in the same timing, use `<=>` in the third arg `transition('normal <=> highlighted', animate(300))` - both directions.
```ts
@Component({
  // ...
	animations: [
		trigger('divState', [
			state('normal', style({
				'background-color': 'red',
				'transform': 'translateX(0)'
			})), // atlest two states (from to)
			state('highlighted', style({
				backgroundColor: 'blue',
				transform: 'translateX(100px)'
			})),
      transition('normal => highlighted', animate(300)) // ms
      transition('highlighted => normal', animate(800)) // ms
		]),
	]
})
```
To switch between states just update the value of trigger state name.

### Advanced Animations
Additional middle phase
```ts
	trigger('wildState', [
  state('normal', style({
    backgroundColor: 'red',
    transform: 'translateX(0) scale(1)'
  })), // atlest two states (from to)
  state('highlighted', style({
    backgroundColor: 'blue',
    transform: 'translateX(100px) scale(1)'
  })), // atlest two states (from to)
  state('shrunken', style({
    backgroundColor: 'green',
    transform: 'translateX(0) scale(0.5)'
  })),
  transition('normal => highlighted', animate(300)),
  transition('highlighted => normal', animate(800)),
  transition('shrunken <=> *', [
    style({
      backgroundColor: 'orange' // in between styling
    }),
    animate(1000, style({
      borderRadius: '50px' // in between styling
    })),
    animate(500)
  ]) // to any state should play, array update
```

### The `void` state
void:  means doesn't exist. animate anything that is yet to be created.
```ts
	transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(-100px)'
    }),
    animate(300)
  ]),
  	transition('* => void', [ // when element is removed
    style({
      opacity: 0,
      transform: 'translateX(100px)'
    }),
    animate(300)
  ]),
```
### Using Keyframes for Animations
Control precisely, w/c state / time during the transition.
```ts
  trnasition('void => *', [
    animate(1000, keyframes([
      style({
        transform: 'translateX(-100px)',
        opacity: 0,
        offset: 0,
      }),
      style({
        transform: 'translateX(-50px)',
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        transform: 'translateC(-20px)'
        opacity: 1,
        offset: 0.8
      }),
      style({
        transform: 'translateX(0px)'
        opacity: 1,
        offset: 1
      })
    ]))
  ])
```

### Grouping Transitions
Using group to animate animations to perform at the same time.
```ts
transition('* => void', [
  group([ // perform animations at the same time
    animate(300, style([
      color: 'red'
    ])),
    animate(800, style([
      transform: 'translateX(100px)',
      opacity: 0
    ]))
  ])
])
```

### Using Animation Callbacks
In your element use event binding from the referenced animation name.
```html
<div
  [@divState]="state"
  (@divState.start)="callback1"
  (@divState.done)="callback1"
></div>
```

## Basic Unit Testing
[Official Docs](https://angular.io/docs/ts/latest/guide/testing.html)
[Article](https://semaphoreci.com/community/tutorials/testing-components-in-angular-2-with-jasmine)

For **more Information on how to run Tests with the CLI** have a look at their official Docs:
- [Unit Tests](https://github.com/angular/angular-cli#running-unit-tests)
- [E2E Tests](https://github.com/angular/angular-cli#running-end-to-end-tests)

### Why?
- Guard against breaking changes
- Analyze code behavior (Expected and Unexpected)
- Reveal design mistakes

## What Changed in Angular 4
Skipped v3 because internal versioning conflicts.

- new **ngIf** with else part (wrap alternative contect usong ng-template and assign a local ref)
- email validator
- renderer2 with new apis
- TS v2
- Flat ESM: help reduce size, remove unused codes.. etc.
- angular animations has its own separate package, import BrowserModuleAnimation from app mpdule.

## Bonus TypeScript for angular 2 usage
[Official Doc](http://www.typescriptlang.org/docs/home.html)

### Why TS instead of normal JS?
Not really, It adds some nice features to the language, more fun (opinion), less error prone and easier. Important things in TS are typings. Also Creating Classes, Interfaces, Generic types and Modules.







