import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const loadTasks = createAction('[Task List] Load Tasks');
export const tasksLoaded = createAction('[Task API] Tasks Loaded', props<{ tasks: Task[] }>());
export const addTask = createAction('[Task Form] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task Details] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task List] Delete Task', props<{ id: number }>());
