import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/models/task.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() insertEvent = new EventEmitter();

  newTaskForm!: FormGroup;
  
  newTask:ITask = {
    id: '',
    isCompleted: false,
    description: ''
  }

  constructor(private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
    this.newTaskForm = this.formBuilder.group(
      {
        description:['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])]
      }
  )};

  get description(){
    return this.newTaskForm.get('description');
  }

  insertar(){
    if(this.newTaskForm.valid){
      this.newTask.description = this.newTaskForm.get('description')?.value;
      this.newTaskForm.reset({description:''});
      this.insertEvent.emit(this.newTask);
    }
  }
}
