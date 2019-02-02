import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {AuthService} from '../auth/auth.service';

import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class RecipeService {
	recipeChanged = new Subject();
	databaseUrl = 'https://recipebook-57ef9.firebaseio.com/recipes.json';

	private recipes: Recipe[] = [];

	constructor(private http: HttpClient, private authService: AuthService) {}

	storeRecipes() {
		const token = this.authService.getToken();

		return this.http.put(this.databaseUrl + token, this.getRecipes(), {
			params: new HttpParams().set('auth', token)
		});
	}

	fetchRecipes() {
		const token = this.authService.getToken();
		return this.http.get<Recipe[]>(this.databaseUrl + token, {
			observe: 'body',
			responseType: 'json',
			params: new HttpParams().set('auth', token)
		})
		.pipe(map((recipes) => {
			/*var recipes = response.json();*/
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