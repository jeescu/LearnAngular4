import { Component } from '@angular/core';
// A special type of class

// fields
@Component({
  selector: 'app-server', // unique selector, an html tag.
  templateUrl: './server.component.html', // path to html file
  styles: [`
    .online {
      color: white;
    }
  `]
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offline';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online': 'offline';
  }
  
  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}