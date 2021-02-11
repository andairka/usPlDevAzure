import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Post } from './Post';

@Component({
	selector: 'app-post-list',
	styleUrls: ['../app.component.css'],
	template: `
		<h1>Post list</h1>

		<ul>
		<li *ngFor="let post of posts">
			<app-post [post]="post"></app-post>
		</li>
		</ul>
	`,
})
export class PostListComponent implements OnInit {
	constructor(private readonly appService: AppService) {}

	posts: Post[];
	ngOnInit(): void {
		this.appService.fetchPosts().subscribe((response: Post[]) => (this.posts = response));
	}
}
