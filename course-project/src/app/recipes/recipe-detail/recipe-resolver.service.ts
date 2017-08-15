import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from "app/recipes/recipe.service";

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot): Recipe {
    return this.recipeService.getRecipe(+route.params['id'])
  }
}