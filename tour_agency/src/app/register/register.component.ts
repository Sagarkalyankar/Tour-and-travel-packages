import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { username: '', email:'', password: '', phone_number: '', address: '' };
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    this.http.post('http://127.0.0.1:8000/register_user/', this.user).subscribe((response: any) => {
      this.message = 'User registered successfully! please login';
      this.router.navigate(['/login']);
    });
  }

}
