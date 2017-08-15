import { Component, EventEmitter, Output } from '@angular/core'
import { DataStorageService } from "app/shared/data-storage.service";
import { Response } from '@angular/http';
import { AuthService } from "app/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  // property is publicly outside, app can use it. just define this as a prop in theelement
  constructor(private dataStorageService: DataStorageService,
    public authService: AuthService,
    private router: Router) { }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
      (response: Response) => {
        return response.json();
      }
      )
  }

  fetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogOut() {
    this.authService.signOut();
    this.router.navigate(['/signin'])
  }
}