import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-packages',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent implements OnInit{
 packages: any[] = [];

 constructor(private http: HttpClient, private router: Router) {}

 ngOnInit(): void {
  this.http.get<{ packages: any[] }>('http://127.0.0.1:8000/home/').subscribe(response => {
    this.packages = response.packages; 
  });}

  viewPackage(id: number) {
    alert(`Viewing package ${id}`);
    this.router.navigate(['/view-package', id]);
  }
}
