import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "app/recipes/recipe.service";
import { Recipe } from "app/recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "app/auth/auth.service";

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipes-bdc7c.firebaseio.com/recipes.json?auth='+token, this.recipeService.getRecipes())
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.http.get('https://ng-recipes-bdc7c.firebaseio.com/recipes.json?auth='+token)
      .map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = []
          }
        }
        return recipes;
      }
      )
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
      )
  }
}