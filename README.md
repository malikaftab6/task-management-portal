# Task Management System

## Objective
To develop a comprehensive Task Management System using Angular that demonstrates advanced concepts and best practices.

## Features
- Dashboard view with responsive design.
- Add/Edit/Delete/View tasks.
- Search and filter tasks.
- Drag-and-Drop for task status updates.
- Pagination for the task list to handle large datasets.

## Folder Structure
```
src/
|-- app/
    |-- components/
        |-- header/
        |-- task-list/
        |-- task-form/
        |-- task-details/
    |-- services/
        |-- task.service.ts
        |-- user.service.ts
    |-- state/
        |-- actions/
        |-- reducers/
        |-- effects/
    |-- modules/
        |-- tasks/
    |-- shared/
        |-- common-module/
        |-- confirmation-dialog/
        |-- constants/
        |-- layout/
            |-- header/
    |-- models/
        |-- tasks.models.ts/
    |-- app.component.ts
    |-- app.module.ts
```

## Setup Instructions
1. Clone the repository or extract the ZIP file.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.(Recommended Node version is v16.x.x to v18.x.x)
4. Use `ng serve` to start the development server.
5. Access the application in your browser at `http://localhost:4200`.


## Building the Project
- Run `ng build` to build the production version of the app.
- The build artifacts will be stored in the `dist/` directory.

## Running Tests
- Run `ng test` to execute unit tests via Karma.
- Test coverage reports can be viewed in the terminal or HTML output.

## Debugging
- Use browser developer tools to debug UI and inspect network requests.
- For TypeScript debugging, use the Angular CLI’s `source-map` support.

## Evaluation Criteria
- **Code Quality**: Adherence to Angular best practices.
- **Problem-Solving**: Logical implementation of requirements and effective state management.
- **UI/UX**: Responsive and user-friendly interface.
- **Testing**: High-quality unit test coverage.
- **Creativity**: Implementation of stretch goals.

## Assumptions and Limitations
- Dummy user data is used for demonstration purposes.
- State management is handled using NgRx or BehaviorSubject depending on module complexity.
