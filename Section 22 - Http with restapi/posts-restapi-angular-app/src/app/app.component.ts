import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFeching = false;
  error = null;
  private errorSub : Subscription;

  constructor(private http: HttpClient,
    private postsService: PostsService) { }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })
    this.fetchMethod();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchMethod();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }

  private fetchMethod() {
    this.isFeching = true;
    this.postsService.fetchPosts()
      .subscribe(
        (posts) => {
        this.isFeching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFeching = false;
        this.error = error.message;
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }
}
