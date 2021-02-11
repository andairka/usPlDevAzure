import { Component, Input, OnInit } from '@angular/core';
import { Post } from './Post';

@Component({
	selector: 'app-post',
	template: `
		<div>
			<h2>{{ post.title }}</h2>
			<div>Post: {{ post.text }}</div>
			<div>Added by {{ post.username }} at {{post.time | date:'shortTime'}}</div>
		</div>
	`,
})
export class PostComponent {
	@Input()
	post: Post;
	constructor() {}
}
