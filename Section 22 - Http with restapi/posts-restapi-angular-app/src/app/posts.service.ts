import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, tap } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http
            .post<{ name: string }>(
                'https://posts-restapi-angular-app-default-rtdb.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response',
                }
            )
            .subscribe(responseData => {
                console.log(responseData.body);
            }, error => {
                this.error.next(error.message);
            });
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom-param', 'hello');
        return this.http
            .get<{ [key: string]: Post }>('https://posts-restapi-angular-app-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({ 'custom-header': 'hello' }),
                // params: new HttpParams().set('print', 'pretty')
                params: searchParams,
                responseType: 'json'
            })
            .pipe(
                map(responceData => {
                    const postsArray: Post[] = [];
                    for (const key in responceData) {
                        if (responceData.hasOwnProperty(key)) {
                            postsArray.push({ ...responceData[key], id: key });
                        }
                    }
                    return postsArray;
                })
            )
    }

    deletePosts() {
        return this.http
            .delete('https://posts-restapi-angular-app-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events',
            })
            .pipe(
                tap(event => {
                    console.log(event);
                    if(event.type === HttpEventType.Sent){
                        // ...
                    }
                    if(event.type === HttpEventType.Response){
                        console.log(event.body);
                    }
                })
            )
    }
}