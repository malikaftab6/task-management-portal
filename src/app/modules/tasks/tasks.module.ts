import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from '../../shared/common-modules/material/material.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskDetailsComponent, 
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule here
    ReactiveFormsModule,
    DragDropModule,
    MaterialModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
