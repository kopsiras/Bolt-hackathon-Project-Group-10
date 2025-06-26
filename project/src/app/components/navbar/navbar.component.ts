import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
