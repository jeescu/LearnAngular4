import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  createServerStatus = 'No server is created';
  serverName = 'Test Server';
  serverCreated = false;
  servers = [
    'Test Server 1',
    'Test Server 2'
  ]

  constructor() {
    // simulate load
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2e3);

  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.createServerStatus = 'Server was created: ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    // explicitly defined the type of target
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
