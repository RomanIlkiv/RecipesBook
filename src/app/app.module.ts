import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard} from './auth/auth-guard.service';
import { HomeComponent } from './shared/home/home.component';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [RecipeService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
