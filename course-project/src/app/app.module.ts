import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "app/shared/shared.module";

import { AppComponent } from './app.component';

import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless/unless.directive';

import { ShortenPipe } from "app/shorten.pipe";

import { ShoppingListModule } from "app/shopping-list/shopping-list.module";
import { AuthModule } from "app/auth/auth.module";
import { CoreModule } from "app/core/core.module";

@NgModule({
  declarations: [
    AppComponent, // Ideally this is the only declarations left in your app module. other declarations are in other modules
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    ShortenPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,        
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
