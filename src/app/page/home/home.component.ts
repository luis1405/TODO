import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ITask } from 'src/app/models/task.interface';
import { IResponse } from 'src/app/models/response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listTasks!:ITask[];
  constructor(private todoService: TodoService){

  }
  ngOnInit(): void {
    this.todoService.getAll().subscribe({
      next: (response: ITask[]) => {
        this.listTasks = response;
      },
      error:(error) => {
        alert(error.message);
        console.error(error);
      }
    });
  }

  insertTask(task: ITask){
    this.todoService.insert(task).subscribe({
      next: (response: IResponse<ITask>) => {
         //console.table(response)
        if(response.isSuccess)
        {          
          this.listTasks.push(response.object);
        }
        else{
          console.error(response.errors);
        }
      },
      error:(error) => {
        alert(error.message);
        console.error(error);
      }
    });
  }

  updateTask(task: ITask){
    this.todoService.update(task).subscribe({
      next: (response: IResponse<ITask>) => {
        // console.table(response);
        if(response.isSuccess)
        {
          var updatedTask = this.listTasks.find(item => item.id == task.id);
          updatedTask = task;
        }
        else{
          console.error(response.errors);
        }
      },
      error:(error) => {
        alert(error.message);
        console.error(error);
      }
    });
  }

  deleteTask(task: ITask){
    if(confirm('Eliminar tarea?')){
      this.todoService.delete(task).subscribe({
        next: (response: IResponse<ITask>) => {
          // console.table(response)
          if(response.isSuccess)
          {
            this.listTasks.splice(this.listTasks.findIndex(item => item.id == task.id),1);
          }
          else{
            console.error(response.errors);
          }
        },
        error:(error) => {
          alert(error.message);
          console.error(error);
        }
      });

    }
  }

}
