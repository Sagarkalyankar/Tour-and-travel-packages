import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-view-package',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './view-package.component.html',
  styleUrls: ['./view-package.component.css']
})
export class ViewPackageComponent implements OnInit {
  package: any = {}; 
  packages: any[] = [];
  id: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam; // Convert string to number
        this.fetchPackage();
      }
    });
  }

  fetchPackage(): void {
    this.http.get<any>(`http://127.0.0.1:8000/package/${this.id}`)
      .subscribe(
        response => {
          console.log(response);
          this.package = response.package;
        },
        error => {
          console.error('Error fetching package:', error);
        }
      );
  }

  book_package(){
    this.router.navigate(['/book-package', this.id]);
  }
}
