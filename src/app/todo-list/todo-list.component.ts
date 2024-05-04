import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../services/todo-list.service';
import { DatePipe, NgFor } from '@angular/common';
interface Task {
  id: number;
  taskName: string;
  deadline: Date;
  isCompleted: boolean;
}
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, NgFor, ReactiveFormsModule, DatePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  tasks: Task[] = [];
  taskForm!: FormGroup;
  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.taskForm = this.fb.group({
      task: ['', Validators.required],
      deadline: ['', Validators.required],
    });
    this.getTask();
  }

  getTask() {
    this.todoService.getTasks().subscribe((res: any) => {
      const notCompleted = res.data
        .filter((task: any) => !task.isCompleted)
        .sort((a: any, b: any) => a.id - b.id);
      const completed = res.data
        .filter((task: any) => task.isCompleted)
        .sort((a: any, b: any) => a.id - b.id);
      this.tasks = [...notCompleted, ...completed];
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: 0,
        taskName: this.taskForm.value.task,
        deadline: this.taskForm.value.deadline,
        isCompleted: false,
      };
      this.todoService.addTask(newTask).subscribe(
        (task) => {
          this.taskForm.reset();
          this.getTask();
        },
        (err) => console.log(err)
      );
    }
  }

  changed(id: number, isCompleted: boolean) {
    this.todoService.updateTask(id, isCompleted).subscribe(
      (task) => {
        this.getTask();
      },
      (err) => console.log(err)
    );
  }
}
