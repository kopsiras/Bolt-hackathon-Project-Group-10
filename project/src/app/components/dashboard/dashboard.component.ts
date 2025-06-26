import { Component, OnInit } from '@angular/core'; // Add OnInit
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient and HttpClientModule
import { Observable, of } from 'rxjs'; // For reactive programming, optional but good practice

interface RecentItem {
  id: number;
  name: string;
  type: string;
}

// Define an interface for your search results (e.g., uploaded files)
interface SearchResult {
  id: string;
  filename: string;
  contentType: string; // e.g., 'application/pdf', 'text/plain'
  uploadDate: string;
  // Add other relevant properties like 'description', 'matchedContentSnippet'
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, HttpClientModule], // Add HttpClientModule
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { // Implement OnInit
  searchQuery: string = '';
  recentItems: RecentItem[] = [
    { id: 1, name: 'Document Analysis', type: 'analysis' },
    { id: 2, name: 'Research Paper', type: 'document' },
    { id: 3, name: 'Data Extract', type: 'data' }
  ];

  searchResults: SearchResult[] = []; // New property to store search results
  isLoadingSearch: boolean = false; // To show a loading indicator

  // Replace with your actual backend API URL
  private apiUrl = 'http://localhost:3000/api'; // Example backend URL

  constructor(private router: Router, private http: HttpClient) {} // Inject HttpClient

  ngOnInit(): void {
    // Optionally load some initial data or recent searches when the component initializes
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.isLoadingSearch = true;
      console.log('Searching for:', this.searchQuery);

      this.http.get<SearchResult[]>(`${this.apiUrl}/search/files?q=${encodeURIComponent(this.searchQuery)}`)
        .subscribe({
          next: (data) => {
            this.searchResults = data;
            this.isLoadingSearch = false;
            console.log('Search results:', this.searchResults);
          },
          error: (error) => {
            console.error('Error during search:', error);
            this.isLoadingSearch = false;
            // Optionally, display an error message to the user
          }
        });
    } else {
      this.searchResults = []; // Clear results if search query is empty
    }
  }

  onRecentItemClick(item: RecentItem) {
    console.log('Recent item clicked:', item);
    // Navigate to specific item or open details based on item.type or item.id
    // Example: this.router.navigate(['/view-document', item.id]);
    // If it's a "search" type recent item, you could populate the search bar and re-run search:
    // this.searchQuery = item.name;
    // this.onSearch();
  }

  getInitial(name: string): string {
    return name.charAt(0).toUpperCase();
  }

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

  // New method to handle clicking on a search result
  onSearchResultClick(result: SearchResult) {
    console.log('Search result clicked:', result);
    // You might want to navigate to a detailed view of the file or download it
    // Example: this.router.navigate(['/file-details', result.id]);
  }
}