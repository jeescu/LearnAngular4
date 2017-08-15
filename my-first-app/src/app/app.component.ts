import { Component } from '@angular/core';

// Component decorator, replacing app-root div by this component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'This is App Component!';
  name = '';
}
