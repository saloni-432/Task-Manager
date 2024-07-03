import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'title', 'delete', 'View Details'];
  formpriority: string = "none";
  prioritySelect: string = "none";
ID:number=0;
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {
    this.tasks$ = new Observable<Task[]>();
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.sortTasksByPriority();
    });
  }
  resetDropdown() {
    this.prioritySelect = 'none'; // Reset to the default value
  }
  // Sort by priority: high > med > low
  sortTasksByPriority() {
    const priorities: { [key: string]: number } = { 'table-danger': 1, 'table-warning': 2, 'table-success': 3 };
    this.tasks.sort((a, b) => {
      const aPriority = priorities[a.priority] || 4;
      const bPriority = priorities[b.priority] || 4;
      return aPriority - bPriority;
    });
  }

  // Create task
  createtask(title: string, details: string): void {
    const newTask: Task = {
      id: this.ID++,
      title: title,
      description: details,
      priority: this.prioritySelect
    };
    this.taskService.addtask(newTask);
  }

  // Delete task
  delete(id: number): void {
    this.taskService.deletetask(id);
  }

  // Go to detail
  goTodetail(id: number): void {
    this.router.navigate(['/task', id]);
  }

  // Search task by ID
  value: string = "";
  Searchtaskbyid(t: Task): boolean {
    let id = t.id.toString();
    return this.value === '' || id.includes(this.value);
  }

  // Search task by Priority
  Searchtaskbypriority(t: Task): boolean {
    return t.priority === this.formpriority || this.formpriority === 'none' || this.formpriority === 'all';
  }

  // Search task by title
  flagtitle: string = "";
  Searchtaskbytitle(t: Task): boolean {
    const mytitle = t.title.toLowerCase();
    const giventitle = this.flagtitle.toLowerCase();
    return giventitle === '' || mytitle.includes(giventitle);
  }

  // Search task by description
  flagdescription: string = "";
  Searchtaskbydescription(t: Task): boolean {
    const mydescription = t.description.toLowerCase();
    const givendescription = this.flagdescription.toLowerCase();
    return givendescription === '' || mydescription.includes(givendescription);
  }

  // Validate the task
  valid(t: Task): boolean {
    return this.Searchtaskbypriority(t) && this.Searchtaskbytitle(t) && this.Searchtaskbydescription(t)
      && this.Searchtaskbyid(t);
  }
}
