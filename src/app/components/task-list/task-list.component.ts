import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../models/task.model';
import { loadTasks, deleteTask, updateTask } from '../../state/actions/task.actions';
import { STATUSES, PRIORITIES } from '../../shared/constants/task.constants';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  tasks$: Observable<Task[]>; // Observable to get tasks from the store
  dataSource = new MatTableDataSource<Task>([]); // MatTableDataSource for table
  displayedColumns: string[] = ['name', 'description', 'priority', 'status', 'assigned', 'date', 'actions'];
  priorities = PRIORITIES;
  statuses = STATUSES;

  allTasks: Task[] = []; // Keep a copy of the original tasks


  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // MatPaginator reference

  searchTerm: string = '';
  filters = { priority: '', status: '' };

  constructor(
    private store: Store<{ tasks: Task[] }>,
    private router: Router,
    private dialog: MatDialog // Injecting MatDialog
  ) {
    this.tasks$ = this.store.select('tasks'); // Select the tasks state
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks()); // Dispatch action to load tasks

    // Subscribe to the tasks observable to categorize tasks by status
    this.tasks$.subscribe((tasks) => {
      this.pendingTasks = tasks.filter((task) => task.status === 'Pending');
      this.inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
      this.completedTasks = tasks.filter((task) => task.status === 'Completed');
      this.allTasks = tasks; // Store the original tasks
      this.dataSource.data = tasks; // Populate the data source
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Attach paginator after view initialization
  }

  applyFilters(): void {
    const filteredTasks = this.allTasks.filter((task) =>
      (!this.searchTerm || task.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.filters.priority || task.priority === this.filters.priority) &&
      (!this.filters.status || task.status === this.filters.status)
    );

    this.dataSource.data = filteredTasks; // Update data source with filtered data

    // Reset to the first page after applying filters
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilters(); // Refresh the task list
  }

  onDrop(event: CdkDragDrop<Task[]>, status: 'Pending' | 'In Progress' | 'Completed'): void {
    if (event.previousContainer === event.container) {
      return;
    }

    const task = event.previousContainer.data[event.previousIndex];
    task.status = status; // Update the task status

    this.store.dispatch(updateTask({ task })); // Dispatch action to update task status

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // Update the allTasks array to reflect the changes
    const taskIndex = this.allTasks.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
      this.allTasks[taskIndex] = task;
    }
  }

  addTask(): void {
    this.router.navigate(['/tasks/add']); // Navigate to add form page
  }

  editTask(id: number): void {
    this.router.navigate([`/tasks/${id}/edit`]); // Navigate to edit form page
  }

  deleteTask(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this task?',
        title: 'Delete Task',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteTask({ id })); // Dispatch deleteTask action
        this.allTasks = this.allTasks.filter((task) => task.id !== id); // Remove the task from the allTasks array
        this.applyFilters(); // Reapply filters
      }
    });
  }

  viewTask(id: number): void {
    this.router.navigate([`/tasks/${id}`]); // Navigate to view details page
  }
}
