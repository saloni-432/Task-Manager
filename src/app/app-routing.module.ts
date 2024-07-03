import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';


const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'task/:id', component: TaskDetailComponent }, 
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },//when path is empty redirect to home
  { path: '**', redirectTo: '/tasks' } // Handle other routes
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
