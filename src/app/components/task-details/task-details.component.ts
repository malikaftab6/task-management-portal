import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task$!: Observable<Task | undefined>; // Use definite assignment operator

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<{ tasks: Task[] }>) {}

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.task$ = this.store.select('tasks').pipe(
      map((tasks) => tasks.find((task) => task.id === taskId)) // Select the task with the matching ID
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'chip-warn'; // Custom yellow class
      case 'In Progress':
        return 'chip-accent'; // Custom blue class
      case 'Completed':
        return 'chip-primary'; // Custom green class
      default:
        return 'chip-default'; // Default class
    }
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}