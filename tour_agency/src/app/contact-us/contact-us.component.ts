import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact-us',
  imports: [FormsModule, CommonModule,NavbarComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})

export class ContactComponent {
  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  submitContact() {
    this.http.post('http://127.0.0.1:8000/contact/', this.contact).subscribe({
      next: (res: any) => {
        alert(res.message || 'Message sent!');
        this.contact = { name: '', email: '', subject: '', message: '' }; // reset
      },
      error: err => {
        alert('Failed to send message.');
        console.error(err);
      }
    });
  }
}
