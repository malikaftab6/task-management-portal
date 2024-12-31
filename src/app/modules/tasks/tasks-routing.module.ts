import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';


const routes: Routes = [
  { path: '', component: TaskListComponent }, // Default: Task List
  { path: 'add', component: TaskFormComponent }, // Add Task
  { path: ':id/edit', component: TaskFormComponent }, // Edit Task
  { path: ':id', component: TaskDetailsComponent } // View Task
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
