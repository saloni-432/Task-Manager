import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskservice: TaskService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.taskservice.getTasks().subscribe((tasks: Task[]) => {
        this.task = tasks.find((task: Task) => task.id === +id);
      });
    }
  }

  // Updating details
  flag: boolean = false;
  updatedetails: string = '';
  editdetails(update: Task): void {
    this.flag = false;
    this.taskservice.updateTask(update, this.updatedetails);
  }

  // Reseting input to initial value
  edit(description: string): void {
    this.flag = true;
    this.updatedetails = description;
  }
  home(): void {
    this.router.navigate(['/tasks']);
  }
}
