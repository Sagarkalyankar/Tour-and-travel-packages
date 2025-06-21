import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  imports: [FormsModule,CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs = [
    {
      question: 'What is the cancellation policy?',
      answer: 'You can cancel up to 48 hours before your trip for a full refund.',
      open: false
    },
    {
      question: 'Do you offer group discounts?',
      answer: 'Yes, we offer discounts for groups of 10 or more. Contact us for details.',
      open: false
    },
    {
      question: 'Are flights included in the packages?',
      answer: 'Flights are not included by default, but you can add them during booking.',
      open: false
    },
    {
      question: 'Do I need travel insurance?',
      answer: 'Travel insurance is recommended but not mandatory. We offer insurance options during checkout.',
      open: false
    }
  ];

  toggleFAQ(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
