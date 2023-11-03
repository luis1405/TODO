import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../models/task.interface';
import { todoApiURL } from 'src/config/constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(todoApiURL);
  }
  insert(task:ITask):Observable<any>{
    return this.http.post(todoApiURL, task);
  }
  update(task:ITask):Observable<any>{
    return this.http.put(todoApiURL, task);
  }
  delete(task:ITask):Observable<any>{
    return this.http.delete(todoApiURL,{ 'body': task});
  }
}
