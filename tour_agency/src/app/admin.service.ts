import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8000/api/admin/';
  private baseUrl2 = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}dashboard/`);
  }

  getPackages(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl2}home/`).pipe(
      map(response => response.packages)  // Extract just the packages array
    );
  }
  

  // getBookedPackages(): Observable<any[]> {
  //   return this.http.get<any>(`${this.baseUrl}bookings/`).pipe(
  //     map(response => response.bookedPackages)  // Extract just the packages array
  //   );
  // }

  getBookedPackages(): Observable<any[]> {
    return this.http.get<{ bookedPackages: any[] }>(`${this.baseUrl}bookings/`).pipe(
      map(response => response.bookedPackages)  
    );
  }

  addPackage(pkg: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}packages/`, pkg);
  }

  editPackage(id: number, pkg: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}packages/${id}/`, pkg);
  }

  deletePackage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}packages/${id}/`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<{ users: any[] }>(`${this.baseUrl}users/`).pipe(
      map(response => response.users)  // Extract just the users array
    );
  }
  getMessages(){
    return this.http.get<{ messages: any[]}>(`${this.baseUrl}getMessages`).pipe(
      map(response => response.messages)
    )
  }
}
