import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user = { username: '', email:'', phone_number: '', address: '' };

  
  bookings: any[] = [];

  constructor(private http: HttpClient, private rout: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };

    // ✅ User profile fetch (unchanged)
    this.http.get<{ username: string; email: string; phone_number: string; address: string }>(
      'http://127.0.0.1:8000/user_profile/', { headers }
    ).subscribe({
      next: response => this.user = response,
      error: err => console.error('User profile error:', err)
    });

    // ✅ Booking data fetch
    this.http.get<{ bookings: any[] }>(
      'http://127.0.0.1:8000/user_bookings/', { headers }
    ).subscribe({
      next: res => this.bookings = res.bookings,
      error: err => console.error('Booking fetch error:', err)
    });
  }

  viewBooking(): void {
    alert('Booking clicked!');
    // You can add navigation or modal logic here
  }
}
