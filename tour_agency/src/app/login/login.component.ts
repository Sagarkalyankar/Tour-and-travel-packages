import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  message: string = '';


  constructor(private http: HttpClient,private router: Router, private authService:AuthService) {}

  // login(): void {
  //   this.http.post('http://127.0.0.1:8000/login_user/', this.credentials).subscribe(
  //     (response: any) => {
  //       this.message = response.message;
  //       this.router.navigate(['']);
  //     },
  //     error => {
  //       this.message = 'Invalid credentials';
  //     }
  //   );
  // }
  login(): void {
   
    this.authService.login(this.credentials.username, this.credentials.password).subscribe({
      next: (res) => {
        this.message = 'Login successful!';
        console.log('Login Success!',res);
        this.router.navigate(['']);
      },
      error: err => {
        console.error('Login failed', err)
        this.message = 'Invalid credentials';
      }
    });
  }
}
