import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = ['User A', 'User B', 'User C'];

  getUsers(): Observable<string[]> {
    return of(this.users);
  }
}
