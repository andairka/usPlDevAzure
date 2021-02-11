import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-signup-component',
	styleUrls: ['../app.component.css'],
	template: `
		<div class="example-full-width">
			<div class="mat-headline">Sign up new user</div>
			<form class="example-form">
				<div>
					<mat-form-field class="example-full-width">
						<mat-label>Username</mat-label>
						<input matInput name="usernam " placeholder="Username" [(ngModel)]="username" />
					</mat-form-field>
				</div>
				<div>
					<mat-form-field class="example-full-width">
						<mat-label>Email</mat-label>
						<input type="email" matInput name="email" placeholder="Email" [(ngModel)]="email" />
					</mat-form-field>
				</div>
				<div>
					<mat-form-field class="example-full-width">
						<mat-label>Password</mat-label>
						<input type="password" matInput name="password" placeholder="Username" [(ngModel)]="password" />
					</mat-form-field>
				</div>
				<div>
					<mat-form-field class="example-full-width">
						<mat-label>Retype password</mat-label>
						<input
							type="password"
							name="repassword"
							matInput
							placeholder="Retype password"
							[(ngModel)]="repassword"
						/>
					</mat-form-field>
				</div>
				<button mat-raised-button type="submit" (click)="signup()">Submit</button>
			</form>
		</div>
	`,
})
export class SignupComponent {
	public username = '';
	public email = '';
	public password = '';
	public repassword = '';

	constructor(private readonly appService: AppService) {}

	signup(): void {
		this.appService.signup(this.username, this.email, this.password).subscribe(x => this.reset());
	}

	private reset(): void {
		this.username = '';
		this.email = '';
		this.password = '';
		this.repassword = '';
	}
}
