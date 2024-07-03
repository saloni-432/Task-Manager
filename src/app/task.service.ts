import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskarray: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.taskarray);
  KEY: string = 'Task-Manager';
  constructor(private router: Router) { }

  // to get tasks
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  // to add task
  addtask(task: Task): void {
    this.taskarray.push(task);
    this.tasksSubject.next([...this.taskarray]);
    this.setlist(this.KEY, this.taskarray);
  }
  // to delete task
  deletetask(id: number): void {
    this.taskarray = this.taskarray.filter(task => task.id !== id);
    this.tasksSubject.next([...this.taskarray]);
    this.setlist(this.KEY, this.taskarray);
  }
  // to update task
  updateTask(updatedTask: Task, details: string): void {
    const index = this.taskarray.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.taskarray[index].description = details;
      this.tasksSubject.next([...this.taskarray]);
      this.setlist(this.KEY, this.taskarray);
    }
  }
  // to retrieve task by ID
  retrievetask(id: number) {
    const index = this.taskarray.findIndex(task => task.id === id);
    if (index !== -1) {
      this.router.navigate(['/task', id]);
    } else {
      alert('Task not found');
    }
  }
  // local storage get
  getlist(key: string) {
    let list = JSON.parse(localStorage.getItem(key) || '[]');
    return list;
  }
  // local storage set
  setlist(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
