import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes = [
    new Recipe(
      1,
      'Beef Steak', 'A Steaky doubled steak',
      'http://images.media-allrecipes.com/userphotos/250x250/02/57/31/2573174.jpg',
      [new Ingredient('Meat Chop', 1), new Ingredient('Pepper', 2)],
    ),
    new Recipe(
      2,
      'Beef Steak 1', 'A Steaky doubled steak',
      'http://images.media-allrecipes.com/userphotos/250x250/02/57/31/2573174.jpg',
      [new Ingredient('Meat Chop', 1), new Ingredient('Pepper', 2)],
    )
  ];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;  
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    // returns a copy: slice.
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find(
      (r) => {
        return r.id === id;
      }
    );

    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    recipe.id = this.recipes[this.recipes.length - 1].id + 1;
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes = this.recipes.map((recipe) => {
      if (recipe.id === id) recipe = newRecipe;
      return recipe;
    })
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(id: number) {
    this.recipes = this.recipes.filter((recipe) => {
      return recipe.id !== id;
    })
    this.recipesChanged.next(this.recipes.slice())
  }
}