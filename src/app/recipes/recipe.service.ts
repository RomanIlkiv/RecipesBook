import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {

	private recipes: Recipe[] = [
		new Recipe('A test Recipe', 
			'Recipe scription', 
			'https://gdsit.cdn-immedia.net/2017/01/CARNE.jpg',
			[
				new Ingredient('Meat', 1),
				new Ingredient('French Fries', 20),
			],
			1),
		new Recipe('Another test Recipe', 
			'Recipe scription', 
			'https://gdsit.cdn-immedia.net/2017/01/CARNE.jpg',
			[
				new Ingredient('Buns', 1),
				new Ingredient('Meat', 1)
			],
			2),
	];

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipeById(id) {
		return this.recipes.find((recipe) => {
			return recipe.id === parseInt(id);
		});
	}
}