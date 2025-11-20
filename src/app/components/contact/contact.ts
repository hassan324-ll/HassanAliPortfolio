import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    // Persist locally (no backend in this demo)
    this.messages.push(entry);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.messages));
    } catch (e) {
      console.warn('Failed to save message', e);
    }

    // simple success flow
    setTimeout(() => {
      this.sending = false;
      this.success = 'Message sent — I will get back to you soon.';
      this.name = this.email = this.subject = this.message = '';
      setTimeout(() => (this.success = ''), 4200);
    }, 600);
  }
}
