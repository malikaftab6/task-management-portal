import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { addTask, updateTask } from '../../state/actions/task.actions';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  users = ['User A', 'User B', 'User C'];
  isEdit = false;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ tasks: Task[] }>,
    private dialog: MatDialog // Injecting MatDialog
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(200)],
      priority: ['Low', Validators.required],
      status: ['Pending', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', [Validators.required, this.pastDateValidator]]
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.taskId = +id;
        this.store
          .select('tasks')
          .pipe(map((tasks) => tasks.find((task) => task.id === this.taskId)))
          .subscribe((task) => {
            if (task) {
              this.taskForm.patchValue(task);
            }
          });
      }
    });
  }

  pastDateValidator(control: any) {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate < currentDate ? { pastDate: true } : null;
  }

  submitTask(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: this.isEdit
          ? 'Are you sure you want to update this task?'
          : 'Are you sure you want to add this task?',
          title: this.isEdit ? 'Update Task' : 'Add Task',
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const task: Task = {
          ...this.taskForm.value,
          id: this.isEdit ? this.taskId : Date.now()
        };

        if (this.isEdit) {
          this.store.dispatch(updateTask({ task }));
        } else {
          this.store.dispatch(addTask({ task }));
        }

        this.router.navigate(['/tasks']);
      }
    });
  }

  cancel(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to cancel?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/tasks']);
      }
    });
  }
}