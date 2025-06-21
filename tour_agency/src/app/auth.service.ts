import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth/login_user/';
  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ access: string; refresh: string; user: any; message: string }>(`${this.apiUrl}`, { username, password }).pipe(
      tap(response => {
        if (response.access) {
          localStorage.setItem('authToken', response.access); // Correctly storing the JWT
          localStorage.setItem('refreshToken', response.refresh);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.authState.next(true);
        }
      })
    );
  }
  
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.authState.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('username') || 'null');
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
