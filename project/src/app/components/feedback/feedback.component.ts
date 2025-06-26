import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
  selector: 'app-feedback',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
constructor(private router: Router) {}

  onFileDataIngestion() {
    console.log('File & Data Ingestion clicked');
    this.router.navigate(['/file-data-ingestion']);
  }

  onKnowledgeExtraction() {
    console.log('Knowledge extraction & Structuring clicked');
    this.router.navigate(['/knowledge-extraction']);
  }

  onFileDataDigestion() {
    console.log('File & Data digestion clicked');
    this.router.navigate(['/file-data-digestion']);
  }

  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}
