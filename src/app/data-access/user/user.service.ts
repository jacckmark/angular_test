import { inject, Injectable, signal } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private usersState = signal<User[]>([])
  public users = this.usersState.asReadonly();

  private path = '/users';

  create(newUser: Partial<User>) {
    return this.http.post(this.path, newUser).pipe(tap((createdUser) => { this.usersState.update(prev => [...prev, createdUser as User]) }))
  }

  delete(id: string) {
    return this.http.delete(`${this.path}/${id}`).pipe(tap(() => { this.usersState.update(users => users.filter(u => u.id !== id)) }))
  }

  getById(id: string) {
    return this.http.get<User>(`${this.path}/${id}`);
  }

  get() {
    return this.http.get<User[]>(this.path).subscribe(data => this.usersState.set(data));
  }

  update(id: string, user: Partial<User>) {
    return this.http.patch<User>(`${this.path}/${id}`, user).pipe(tap((updatedUser) => { this.usersState.update(users => users.map(u => u.id === id ? updatedUser : u)) }))
  }
}
