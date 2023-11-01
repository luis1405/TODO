import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoApiURL:string = 'https://localhost:7116/api/Todo';

  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.todoApiURL);
  }
  insert(task:ITask):Observable<any>{
    return this.http.post(this.todoApiURL, task);
  }
  update(task:ITask):Observable<any>{
    return this.http.put(this.todoApiURL, task);
  }
  delete(task:ITask):Observable<any>{
    return this.http.delete(this.todoApiURL,{ 'body': task});
  }
}
