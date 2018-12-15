import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../recipe.service';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	//@Input() recipe;
  recipe = {};
  id;

  constructor(private shoppingListService: ShoppingListService, 
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
      this.recipe = this.recipeService.getRecipeById(params.id);
    });
  }

  toShoppingList(recipe) {
  	console.log(recipe);
  	recipe.ingredients.forEach((ingredient) => {
  		this.shoppingListService.addIngredient(new Ingredient(ingredient.name, ingredient.amount));
  	})
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

}
