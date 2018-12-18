import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {AuthService} from '../auth/auth.service';

import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class RecipeService {
	recipeChanged = new Subject();
	databaseUrl = 'https://recipebook-57ef9.firebaseio.com/recipes.json?auth=';

	private recipes: Recipe[] = [];

	constructor(private http: Http, private authService: AuthService) {}

	storeRecipes() {
		const token = this.authService.getToken();

		return this.http.put(this.databaseUrl + token, this.getRecipes());
	}

	fetchRecipes() {
		const token = this.authService.getToken();
		return this.http.get(this.databaseUrl + token)
		.pipe(map((response) => {
			var recipes = response.json();
			for (var recipe of recipes) {
				if (!recipe.ingredients) {
					recipe.ingredients = [];
				}
			}
			return recipes;
		}))
		.subscribe(
			(recipes) => {
				this.recipes = recipes;
				this.recipeChanged.next(this.recipes.slice());
				console.log(recipes);
			}
		);
	}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipeById(id) {
		return this.recipes.find((recipe) => {
			return recipe.id === parseInt(id);
		});
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipeChanged.next(this.recipes.slice());
	}

	updateRecipe(id, newRecipe: Recipe) {
		//var recipe = this.getRecipeById(id);
		//this.recipes[index] = newRecipe;
		this.recipes.forEach((recipe) => {
			if(recipe.id === parseInt(id)) {
				recipe.name = newRecipe.name;
				recipe.description = newRecipe.description;
				recipe.imagePath = newRecipe.imagePath;
				recipe.ingredients = newRecipe.ingredients;
			}
		});
		this.recipeChanged.next(this.recipes.slice());
	}

	deleteRecipe(recipeId) {
		var index;
	    this.recipes.forEach((recipe, i) => {
	      if (recipe.id === recipeId) {
	        index = i;
	      }
	    });
	    this.recipes.splice(index, 1);
	    this.recipeChanged.next(this.recipes.slice());
	}
}