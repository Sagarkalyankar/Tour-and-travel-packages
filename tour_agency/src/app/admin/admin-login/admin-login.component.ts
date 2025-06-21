import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  credentials = { username: '', password: '' };
  message: string = '';


  constructor( private http:HttpClient, private router: Router, private authService:AuthService){}


  login(): void{
    this.http.post<{ access: string; refresh: string; user: any; message: string }>('http://127.0.0.1:8000/login_admin/', this.credentials).subscribe(
          (response: any) => {
            if (response.access) {
              localStorage.setItem('authToken', response.access); // Correctly storing the JWT
              localStorage.setItem('refreshToken', response.refresh);
              localStorage.setItem('user', JSON.stringify(response.user));
              // this.authState.next(true);
            }
            this.message = response.message;
            this.router.navigate(['/admindash']);

          },
          error => {
            this.message = 'Invalid credentials';
          }
        );
  }

}
