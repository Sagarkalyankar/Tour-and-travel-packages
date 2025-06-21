import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
// import { Modal, initMDB } from 'mdb-ui-kit';

// initMDB({ Modal });

@Component({
  selector: 'app-book-package',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './book-package.component.html',
  styleUrls: ['./book-package.component.css']
})
export class BookPackageComponent implements OnInit {
  package: any = {};
  bookingDetails = {
    user_id: 0,
    customerName: '',
    email: '',
    phone: '',
    numOfPeople: 1,
    travelDate: '',
    packageId: 0
  };
  id: number = 0;
  

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router , private authService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.fetchPackage();
      }
    });
    const user = this.authService.getUser(); // assuming this returns user object
  if (user && user.id) {
    this.bookingDetails.user_id = user.id; // Set the user ID from the auth service
  }
  }

  fetchPackage(): void {
    this.http.get<any>(`http://127.0.0.1:8000/package/${this.id}`)
      .subscribe(
        response => {
          console.log(response);
          this.package = response.package;
          this.bookingDetails.packageId = this.package.id;
        },
        error => {
          console.error('Error fetching package:', error);
        }
      );
  }

  // In your book-package.component.ts

bookPackage(): void {
  if (!this.authService.isLoggedIn()) {
    alert('Please log in to continue.');
    this.router.navigate(['/login']);
    return;
  }
  const authToken = localStorage.getItem('authToken'); // Use the correct key

  if (authToken) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`, // Use "Bearer " for JWT
      'Content-Type': 'application/json'
    });
    const body = {
      user_id: this.bookingDetails.user_id,
      travel_date: this.bookingDetails.travelDate,
      number_of_people: this.bookingDetails.numOfPeople
    };
    this.http.post(`http://127.0.0.1:8000/book/${this.id}/`, body, { headers })
      .subscribe(
        response => {
          console.log('Booking successful:', response);
          alert('Package booked successfully!');
          this.router.navigate(['/packages']);
        },
        error => {
          console.error('Error booking package:', error);
          alert('Failed to book the package. Please try again.');
        }
      );
  } else {
    console.warn('No authentication token found in localStorage.');
    alert('You need to be logged in to book a package.');
    this.router.navigate(['/login']);
  }
}
}
