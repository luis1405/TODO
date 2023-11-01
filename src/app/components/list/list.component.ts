import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ITask } from 'src/app/models/task.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() listTasks!:ITask[];

  @Output() updateEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  taskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group(
      {
        tasks: this.formBuilder.array([
        ])
      });
  }

  update(index:number){
    var task = JSON.parse(JSON.stringify(this.listTasks[index])) as ITask;
    task.isCompleted = !task.isCompleted;
    this.updateEvent.emit(task);
  }
  delete(index:number){
    this.deleteEvent.emit(this.listTasks[index]);
  }
}
