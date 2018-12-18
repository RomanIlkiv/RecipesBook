import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class RecipeService {
	recipeChanged = new Subject();
	databaseUrl = 'https://recipebook-57ef9.firebaseio.com/recipes.json';

	/*private recipes: Recipe[] = [
		new Recipe('A test Recipe', 
			'Recipe scription', 
			'https://gdsit.cdn-immedia.net/2017/01/CARNE.jpg',
			[
				new Ingredient('Meat', 1),
				new Ingredient('French Fries', 20),
			]),
		new Recipe('Another test Recipe', 
			'Recipe scription', 
			'https://gdsit.cdn-immedia.net/2017/01/CARNE.jpg',
			[
				new Ingredient('Buns', 1),
				new Ingredient('Meat', 1)
			]),
	];*/

	private recipes: Recipe[] = [];

	constructor(private http: Http) {}

	storeRecipes() {
		return this.http.put(this.databaseUrl, this.getRecipes());
	}

	fetchRecipes() {
		return this.http.get(this.databaseUrl)
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