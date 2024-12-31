import { Task } from "src/app/models/task.model";

export const STATUSES: string[] = ['Pending', 'In Progress', 'Completed'];
export const PRIORITIES: string[] = ['Low', 'Medium', 'High'];

export const MOCK_TASKS: Task[] = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      priority: 'High',
      status: 'Pending',
      assignedTo: 'User A',
      dueDate: '2025-01-20',
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      priority: 'Medium',
      status: 'In Progress',
      assignedTo: 'User B',
      dueDate: '2025-01-15',
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      priority: 'Low',
      status: 'Completed',
      assignedTo: 'User C',
      dueDate: '2025-01-28',
    },
  ];