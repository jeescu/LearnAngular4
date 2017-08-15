import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {
  recipeServiceSubscription: Subscription;
  // typed of recipe item should Recipe Object
  recipes: Recipe[] = []

  constructor(private recipeService: RecipeService,
  private router: Router,
private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeServiceSubscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();    
  }

  ngOnDestroy() {
    this.recipeServiceSubscription.unsubscribe();
  }

  onRecipeAdded(recipeData: { name: string, description: string, imagePath: string }) {
    const { name, description, imagePath } = recipeData;
    this.recipes.push(new Recipe(+new Date(), name, description, imagePath, []));
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
