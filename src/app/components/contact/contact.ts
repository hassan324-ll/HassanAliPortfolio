import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact implements OnInit {
  name = '';
  email = '';
  subject = '';
  message = '';
  sending = false;
  success = '';

  messages: any[] = [];
  private storageKey = 'hassan_portfolio_messages_v1';

  ngOnInit() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) this.messages = JSON.parse(raw) || [];
    } catch (e) {
      console.warn('Could not read messages from storage', e);
    }
  }

  submit() {
    if (!this.name || !this.email || !this.message) {
      this.success = 'Please fill name, email and message.';
      return;
    }

    this.sending = true;

    const entry = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
      date: new Date().toISOString(),
    };

    // Save message locally
    this.messages.push(entry);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.messages));
    } catch (e) {
      console.warn('Failed to save message', e);
    }

    // ---- EmailJS Email Sending ----
    const formData = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
    };

    emailjs
      .send('service_960y21i', 'template_2h8d93g', formData, 'bOcUDi3-jiZ0Nb52F')
      .then(() => {
        this.sending = false;
        this.success = 'Message sent — I will get back to you soon.';

        // Clear form
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';

        // Hide success after a few seconds
        setTimeout(() => (this.success = ''), 4200);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        this.sending = false;
        alert('Something went wrong while sending email.');
      });
  }
}
