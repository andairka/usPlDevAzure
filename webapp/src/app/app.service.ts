import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post/Post';

@Injectable({
	providedIn: 'root',
})
export class AppService {
	constructor(private readonly httpClient: HttpClient) {}

	public signup(username: string, email: string, password: string): Observable<void> {
		return this.httpClient.post<void>('/api/users', { username, email, password });
	}

	public post(username: string, password: string, title: string, text: string): Observable<void> {
		return this.httpClient.post<void>('/api/posts', { username, title, text, password });
	}

	public fetchPosts(): Observable<Post[]> {
		return this.httpClient.get<Post[]>('/api/posts', {});
	}
}
