import { NgModule } from "@angular/core";

import { HomeComponent } from "app/core/home/home.component";
import { HeaderComponent } from "app/core/header/header.component";

import { SharedModule } from "app/shared/shared.module";
import { AppRoutingModule } from "app/app-routing.module";
import { RecipeService } from "app/recipes/recipe.service";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { DataStorageService } from "app/shared/data-storage.service";
import { AuthService } from "app/auth/auth.service";

import { RecipeResolver } from "app/recipes/recipe-detail/recipe-resolver.service";
import { AuthGuard } from "app/auth/auth-guard";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    RecipeResolver,
    DataStorageService,
    AuthService,
    AuthGuard
  ],
})
export class CoreModule { }