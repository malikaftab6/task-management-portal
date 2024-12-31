import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { loadTasks, deleteTask } from '../../state/actions/task.actions';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from '../../models/task.model';
import { of } from 'rxjs';
import { MOCK_TASKS } from 'src/app/shared/constants/task.constants';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore<{ tasks: Task[] }>;
  let dialog: MatDialog;

  const initialState = {tasks: MOCK_TASKS};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [RouterTestingModule, MatDialogModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks action on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadTasks());
  });

  it('should filter tasks correctly', () => {
     // Set initial tasks in the data source using constants
  component.allTasks = MOCK_TASKS;
  component.dataSource.data = MOCK_TASKS;

  // Apply search filter
  component.searchTerm = 'Task 1';
  component.applyFilters();

  // Verify that the dataSource reflects the filtered tasks
  const filteredTasks = MOCK_TASKS.filter((task) =>
    task.name.toLowerCase().includes(component.searchTerm.toLowerCase())
  );

  // Assertions
  expect(component.dataSource.data.length).toBe(filteredTasks.length);
  expect(component.dataSource.data[0].name).toBe(filteredTasks[0].name);
  });

  it('should open confirmation dialog and dispatch deleteTask action on confirm', () => {
    spyOn(store, 'dispatch');
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as any);

    component.deleteTask(1);

    expect(dialog.open).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(deleteTask({ id: 1 }));
  });

  it('should not dispatch deleteTask action if dialog is canceled', () => {
    spyOn(store, 'dispatch');
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(false),
    } as any);

    component.deleteTask(1);

    expect(dialog.open).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
