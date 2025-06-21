import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [FormsModule, CommonModule, ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn = false;
    user: any = null;

    constructor(private authService: AuthService , private cdr: ChangeDetectorRef, private rout: Router) {}

    ngOnInit(): void {
        // Set the initial login state
        this.isLoggedIn = this.authService.isLoggedIn();
        this.user = this.authService.getUser();

        this.authService.getAuthState().subscribe(status => {
            this.isLoggedIn = status;
            this.user = this.authService.getUser();
            this.cdr.detectChanges();
        });
    }

    logout(): void {
        this.authService.logout();
    }
}