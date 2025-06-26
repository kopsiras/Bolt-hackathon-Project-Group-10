import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-file-data-ingestion',
  standalone: true, // Assuming it's a standalone component
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './file-data-ingestion.component.html',
  styleUrls: ['./file-data-ingestion.component.css']
})
export class FileDataIngestionComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Access hidden file input

  extractedText: string = '';
  selectedFile: File | null = null;
  fileName: string | null = null;
  fileContent: string | ArrayBuffer | null = null; // To store file content

  uploading: boolean = false;
  uploadProgress: number = 0;
  router: any;

  constructor() {}

  onUploadHere() {
    console.log('Upload here button clicked - triggering file input.');
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      console.log('Selected file:', this.fileName, this.selectedFile.type, this.selectedFile.size, 'bytes');

      this.extractedText = 'Reading file content...'; // Give immediate feedback
      this.uploading = true;
      this.uploadProgress = 0;

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 100) {
          this.uploadProgress = currentProgress;
        } else {
          clearInterval(interval);
          this.uploading = false;
          this.readFileContent(this.selectedFile as File);
        }
      }, 100); // Faster simulation for extraction
    } else {
      this.selectedFile = null;
      this.fileName = null;
      this.fileContent = null;
      this.extractedText = 'No file selected.';
      this.uploading = false;
      this.uploadProgress = 0;
      console.log('No file selected.');
    }
  }
  
  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }

  private readFileContent(file: File): void {
    const reader = new FileReader();

    // Read as text for common text formats. For PDFs/DOCX, you'd need a backend service or a library.
    if (file.type.startsWith('text/') || file.type.includes('json') || file.type.includes('xml') || file.type.includes('log')) {
      reader.readAsText(file);
    } else {
      // For binary files, you'd typically send them to a backend for extraction.
      // For demonstration, we'll just indicate it's not a direct text file.
      console.warn('File type not directly readable as text by FileReader:', file.type);
      this.extractedText = `File "${file.name}" is a binary type (${file.type}). Text extraction requires specific libraries or a backend service.`;
      this.fileContent = null; // Or you could store as DataURL if needed for other purposes
      return;
    }

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && typeof e.target.result === 'string') {
        this.extractedText = e.target.result; // Display content in textarea
        this.fileContent = e.target.result; // Store for processing
        console.log('File content loaded for extraction.');
      }
    };

    reader.onerror = (e) => {
      console.error('Error reading file for extraction:', reader.error);
      this.extractedText = 'Error extracting text from file.';
      this.fileContent = null;
      this.selectedFile = null;
      this.fileName = null;
    };
  }

  onComplete() {
    console.log('Complete clicked');
    if (!this.selectedFile) {
        alert('Please upload a file before completing.');
        return;
    }
    if (this.uploading) {
        alert('Please wait for the file to finish uploading.');
        return;
    }
    if (!this.extractedText || this.extractedText.includes('Error') || this.extractedText.includes('requires specific libraries')) {
      alert('File content not successfully extracted or is not a text file. Cannot complete.');
      return;
    }

    // Add completion logic here, e.g., send extractedText to a service
    console.log('Extracted Text submitted:', this.extractedText.substring(0, 200) + '...'); // Log first 200 chars
    alert('Extracted text submitted for processing!');
    this.resetForm();
  }

  private resetForm(): void {
    this.selectedFile = null;
    this.fileName = null;
    this.fileContent = null;
    this.extractedText = '';
    this.uploading = false;
    this.uploadProgress = 0;
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = ''; // Clear the file input
    }
  }
}