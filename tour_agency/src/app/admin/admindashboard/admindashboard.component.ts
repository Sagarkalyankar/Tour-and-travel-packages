import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables} from 'chart.js';
import { forkJoin } from 'rxjs';
Chart.register(...registerables)

@Component({
  selector: 'app-admindashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent implements OnInit{

  packages: any[] = [];
  users: any[] = [];
  bookedPackages: any[] = [];

 

  

  newPackage = {
    name: '',
    image: '',
    location: '',
    description: '',
    price: 0
  };

  isEditMode = false;
  editPackageId: number | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboard();
    
  }

 

  loadDashboard(): void {
    forkJoin({
      packages: this.adminService.getPackages(),
      users: this.adminService.getUsers(),
      bookedPackages: this.adminService.getBookedPackages()
    }).subscribe(({ packages, users, bookedPackages }) => {
      
      this.packages = Array.isArray(packages) ? packages : [];
      this.users = Array.isArray(users) ? users : [];
      this.bookedPackages = Array.isArray(bookedPackages) ? bookedPackages : [];
  
      this.createchart(this.users.length, this.packages.length, this.bookedPackages.length);
      console.log(this.users, this.packages, this.bookedPackages);
    });
  }



  
  // pie chart
  public chart: any
 

  createchart(users: number,packages: number,bookedPackages: number){
    this.chart = new Chart('Info',{
      type: 'doughnut',
      data:{
        labels:['Total Users', 'Total Pacakages', 'Booked Packages'],
        datasets:[{
          label:'Info data',
          data:[users,packages,bookedPackages],
          backgroundColor:['red','yellow','blue'],
          hoverOffset:4
        }],
      },
      options:{
        aspectRatio:2.5
      }
    });
  }
  

  addOrUpdatePackage(): void {
    if (this.isEditMode && this.editPackageId !== null) {
      this.adminService.editPackage(this.editPackageId, this.newPackage).subscribe(() => {
        this.resetForm();
        this.loadDashboard();
      });
    } else {
      this.adminService.addPackage(this.newPackage).subscribe(() => {
        this.resetForm();
        this.loadDashboard();
      });
    }
  }

  editPackage(pkg: any): void {
    this.newPackage = { ...pkg };
    this.editPackageId = pkg.id;
    this.isEditMode = true;
  }

  deletePackage(id: number): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.adminService.deletePackage(id).subscribe(() => {
        this.loadDashboard();
      });
    }
  }

  resetForm(): void {
    this.newPackage = { name: '', image: '', location: '', description: '', price: 0 };
    this.isEditMode = false;
    this.editPackageId = null;
  }
}
