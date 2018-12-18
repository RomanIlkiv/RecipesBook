import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes;

  constructor(private recipeService: RecipeService, 
  	private router: Router,
  	private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipeChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.fetchRecipes();
  }

  onNewRecipe() {
  	this.router.navigate(['new'], {relativeTo: this.route});
  }

}
