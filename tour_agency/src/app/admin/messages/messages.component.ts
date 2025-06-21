import { CommonModule  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-messages',
  imports: [FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{

  messages: any[]=[]

    constructor(private adminService: AdminService) {}
  
    ngOnInit(): void {
      this.adminService.getMessages().subscribe(messages =>
      {
        this.messages = messages ;
      }
      );
      
    }

    
}
