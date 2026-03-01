import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  private postsState = signal<Post[]>([])
  public posts = this.postsState.asReadonly();

  private path = '/posts';

  create(newPost: Partial<Post>) {
    return this.http.post(this.path, newPost).pipe(tap((createdPost) => { this.postsState.update(prev => [...prev, createdPost as Post]) }))
  }

  delete(id: string) {
    return this.http.delete(`${this.path}/${id}`).pipe(tap(() => { this.postsState.update(posts => posts.filter(p => p.id !== id)) }))
  }

  getById(id: string) {
    return this.http.get<Post>(`${this.path}/${id}`);
  }

  get() {
    return this.http.get<Post[]>(this.path).subscribe(data => this.postsState.set(data));
  }

  update(id: string, post: Partial<Post>) {
    return this.http.patch<Post>(`${this.path}/${id}`, post).pipe(tap((updatedPost) => { this.postsState.update(posts => posts.map(u => u.id === id ? updatedPost : u)) }))
  }
}
