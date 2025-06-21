import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [FormsModule, CommonModule, NavbarComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  packages: any[] = [];
  message: string = '';
  baseUrl = 'http://127.0.0.1:8000/';

  slide1: string = 'https://hblimg.mmtcdn.com/content/hubble/img/tvdestinationimages/mmt/activities/m_Leh_tv_destination_img_4_l_667_1000.jpg';
  slide2: string = 'https://hblimg.mmtcdn.com/content/hubble/img/new_dest_imagemar/mmt/activities/m_Manali_1_l_658_1200.jpg';
  slide3: string = 'https://hblimg.mmtcdn.com/content/hubble/img/Cappadocia/mmt/activities/m_Cappadocia_4-min_l_674_1000.jpg';

  videos: SafeResourceUrl[] = [];
  worldMapImage: string = 'https://shorturl.at/ufUSY'; // Ensure this image is in assets/
  worldMapLink: string = 'https://www.google.com/maps';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,private router: Router) {}

  ngOnInit(): void {
    // Fetch only the first 3 packages
    this.http.get<{ packages: any[] }>('http://127.0.0.1:8000/home/').subscribe(response => {
      this.packages = response.packages.slice(0, 3); // Only show 3 packages
    });

    // Sanitize YouTube video URLs
    this.videos = [
      this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/rTDaZoDDW5g?si=VYNaD-IztUvTuXVt"),
      this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/XYwP-QndGG0?si=w1DRjCJWzRyFv0k7")
    ];
  }

  viewPackage(id: number) {
    alert(`Viewing package ${id}`);
    this.router.navigate(['/view-package', id]);
    
  }
  FAQ(){
    this.router.navigate(['/faq'])
  }
}
