import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { User } from "./user.model";
import { Task } from "../tasks/task/task.model";

@Injectable({providedIn: 'root'})
export class UserService{
    constructor(private http: HttpClient){};

    getUsers(){
        return this.http
            .get<{[key: string]: User[]}>('https://easy-task-2447b-default-rtdb.firebaseio.com/users.json',
            )
            .pipe(
                map((users) => {
                    const userData: User[] = []
                    for(let user in users){
                        userData.push(...users[user])
                    }
                    return userData;
                })
            )
    }

    setTasks(tasks: Task[]){
        return this.http
            .put('https://easy-task-2447b-default-rtdb.firebaseio.com/tasks.json',
                tasks
            )
    }   

    getTasks(){
        return this.http
            .get<Task[]>('https://easy-task-2447b-default-rtdb.firebaseio.com/tasks.json',
            )
    }
}