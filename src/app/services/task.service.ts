import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';
import { MOCK_TASKS } from '../shared/constants/task.constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Mocked tasks for demonstration; replace with actual backend integration if needed
  private tasks: Task[] = MOCK_TASKS;

  // Fetch all tasks
  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  // Add a new task (simulate backend call)
  addTask(task: Task): Observable<Task> {
    const newTask = { ...task, id: this.generateTaskId() };
    this.tasks.push(newTask);
    return of(newTask);
  }

  // Update an existing task (simulate backend call)
  updateTask(updatedTask: Task): Observable<Task> {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      return of(updatedTask);
    }
    return of(null as any); // Simulate a null response for non-existent task
  }

  // Delete a task by ID (simulate backend call)
  deleteTask(id: number): Observable<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return of();
  }

  // Generate a unique ID for new tasks
  private generateTaskId(): number {
    return this.tasks.length > 0
      ? Math.max(...this.tasks.map((task) => task.id)) + 1
      : 1;
  }
}
