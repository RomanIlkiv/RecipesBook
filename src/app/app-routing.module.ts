import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './shared/home/home.component';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuard} from './auth/auth-guard.service';

const appRoutes: Routes = [
	{path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]},
	{path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
		{path: '', component: RecipeStartComponent},
		{path: 'new', component: RecipeEditComponent},
		{path: ':id', component: RecipeDetailComponent},
		{path: ':id/edit', component: RecipeEditComponent},
	]},
	{path: 'shopping-list', component: ShoppingListComponent},
	{path: 'signup', component: SignupComponent},
	{path: 'signin', component: SigninComponent},
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}