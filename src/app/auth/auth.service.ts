import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
	token;

	constructor(private router: Router) {}

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(
				() => {
					this.router.navigate(['/signin']);
				}
			)
			.catch(
				(error) => {console.log(error);}
			)
	}

	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(
				(response) => {
					console.log(response);
					this.router.navigate(['/recipes']);
					firebase.auth().currentUser.getIdToken()
						.then(
							(token: string) => {
								this.token = token;
								localStorage.setItem('token', token);
							}
						)
				},
				(error) => {console.log(error);}
			);
	}

	getToken() {
		return this.token;
	}

	isAuthenticated() {
		this.token = localStorage.getItem('token');
		return this.token != null;
	}

	logout() {
		firebase.auth().signOut();
		this.token = null;
		this.token = localStorage.removeItem('token');
		this.router.navigate(['/']);
	}
}