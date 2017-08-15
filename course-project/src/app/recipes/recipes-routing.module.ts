import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipeResolver } from './recipe-detail/recipe-resolver.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from "app/recipes/recipe-edit/recipe-edit.component";
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from "app/auth/auth-guard";

const recipeRoutes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }