import { createReducer, on } from '@ngrx/store';
import { addTask, updateTask, deleteTask, tasksLoaded } from '../actions/task.actions';
import { Task } from '../../models/task.model';

export const initialState: Task[] = [];

const _taskReducer = createReducer(
  initialState,
  on(tasksLoaded, (state, { tasks }) => tasks),
  on(addTask, (state, { task }) => [...state, task]),
  on(updateTask, (state, { task }) => state.map(t => t.id === task.id ? task : t)),
  on(deleteTask, (state, { id }) => state.filter(task => task.id !== id))
);

export function taskReducer(state: Task[] | undefined, action: any) {
  return _taskReducer(state, action);
}
