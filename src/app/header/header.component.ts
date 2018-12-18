import { Component } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html"
})
export class HeaderComponent {
	constructor(private recipeService: RecipeService,
				private authService: AuthService) {

	}

	onSaveData() {
		this.recipeService.storeRecipes().subscribe(
			(response) => {
				console.log(response);
			}
		);
	}

	onFetchData() {
		this.recipeService.fetchRecipes();
	}

	onLogout() {
		this.authService.logout();
	}
}