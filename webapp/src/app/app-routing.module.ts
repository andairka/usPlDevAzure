import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './login/signup.component';
import { AddPostComponent } from './post/add-post.component';
import {PostListComponent} from './post/post-list.component';

const routes: Routes = [
	{ path: 'signup', component: SignupComponent },
	{ path: 'add-post', component: AddPostComponent },
	{ path: 'posts', component: PostListComponent },
	{ path: '',   redirectTo: '/posts', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
