import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecipesComponent } from "app/recipes/recipes.component";
import { RecipeStartComponent } from "app/recipes/recipe-start/recipe-start.component";
import { RecipeListComponent } from "app/recipes/recipe-list/recipe-list.component";
import { RecipeEditComponent } from "app/recipes/recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "app/recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "app/recipes/recipe-list/recipe-item/recipe-item.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "app/recipes/recipes-routing.module";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule {}