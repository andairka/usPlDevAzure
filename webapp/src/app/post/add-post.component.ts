import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
	selector: 'app-add-post-component',
	styleUrls: ['../app.component.css'],
	template: `
		<div class="example-full-width">
			<div class="mat-headline">Add new post</div>
			<form #myForm="ngForm" class="example-full-width">
				<div>
					<mat-form-field class="example-full-width">
						<mat-label>Title</mat-label>
						<input matInput name="title" placeholder="Title" [(ngModel)]="title"/>
					</mat-form-field>
				</div>
				<div>
					<mat-form-field class="example-full-width">
						<mat-label>Post</mat-label>
						<textarea type="text" name="text" matInput placeholder="Text" [(ngModel)]="text"></textarea>
					</mat-form-field>
				</div>
				<div>
					<mat-form-field class="example-full-width">
						<mat-label>Username</mat-label>
						<input matInput name="username" placeholder="Username" [(ngModel)]="username"/>
					</mat-form-field>
				</div>
				<div>
					<mat-form-field class="example-full-width">
						<mat-label>Password</mat-label>
						<input type="password" name="password" matInput placeholder="Username" [(ngModel)]="password"/>
					</mat-form-field>
				</div>
			</form>
			<button type="button" (click)="addPost()">Submit</button>
		</div>
	`,
})
export class AddPostComponent {
	title = '';
	text = '';
	username = '';
	password = '';

	constructor(private readonly appService: AppService) {}

	addPost(): void {
		this.appService.post(this.username, this.password, this.title, this.text).subscribe(result => this.reset());
	}

	private reset(): void {
		this.username = '';
		this.password = '';
		this.title = '';
		this.text = '';
	}
}
