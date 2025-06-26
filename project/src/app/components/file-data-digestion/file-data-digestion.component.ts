import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component"; // Ensure FormsModule is imported if not already

@Component({
  selector: 'app-file-data-digestion',
  standalone: true, // Assuming it's a standalone component
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent], // Add FormsModule if you use ngModel elsewhere
  templateUrl: './file-data-digestion.component.html',
  styleUrls: ['./file-data-digestion.component.css']
})
export class FileDataDigestionComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Access hidden file input

  selectedFile: File | null = null; // Stores the selected file object
  fileName: string | null = null; // Stores the name of the selected file for display
  fileContent: string | ArrayBuffer | null = null; // Stores file content (for text or base64 data URL)

  uploading: boolean = false; // Flag to indicate if upload is in progress
  uploadProgress: number = 0; // Current upload progress percentage
  router: any;

  constructor() {}

  // This method is now primarily for conceptual grouping, as the HTML button directly calls fileInput.click().
  onUploadHere(): void {
    console.log('Upload here button clicked - triggering file input.');
    this.fileInput.nativeElement.click(); // Programmatically click the hidden file input
  }

  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Get the selected file
      this.fileName = this.selectedFile.name; // Store filename
      console.log('Selected file:', this.fileName, this.selectedFile.type, this.selectedFile.size, 'bytes');

      // Reset progress and start simulation
      this.uploading = true;
      this.uploadProgress = 0;

      // Simulate file reading/upload progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 100) {
          this.uploadProgress = currentProgress;
        } else {
          clearInterval(interval);
          this.uploading = false;
          // After simulated upload, read the file content
          this.readFileContent(this.selectedFile as File);
        }
      }, 200); // Update every 200ms
    } else {
      this.selectedFile = null;
      this.fileName = null;
      this.fileContent = null;
      this.uploading = false;
      this.uploadProgress = 0;
      console.log('No file selected.');
    }
  }

  private readFileContent(file: File): void {
    const reader = new FileReader();

    // Determine how to read the file based on its type
    // For "Digestion", you might want to process different types.
    // Here, we'll try to read as text if it's common text-based, otherwise as Data URL (Base64)
    if (file.type.startsWith('text/') || file.type.includes('json') || file.type.includes('xml')) {
      reader.readAsText(file);
    } else {
      // For images, PDFs, etc., read as a data URL (Base64 string)
      reader.readAsDataURL(file);
    }

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        this.fileContent = e.target.result; // Store the content
        console.log('File content loaded.');
        // If it's a text file, you might log part of it:
        // if (typeof this.fileContent === 'string' && file.type.startsWith('text/')) {
        //   console.log('First 100 chars of content:', this.fileContent.substring(0, 100));
        // }
      }
    };

    reader.onerror = (e) => {
      console.error('Error reading file:', reader.error);
      alert('Error reading file. Please try again.');
      this.selectedFile = null;
      this.fileName = null;
      this.fileContent = null;
    };
  }
  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
  onComplete() {
    console.log('Complete clicked');
    if (!this.selectedFile) {
      alert('Please upload a file first.');
      return;
    }
    if (this.uploading) {
        alert('Please wait for the upload to complete.');
        return;
    }

    console.log('File Name:', this.fileName);
    console.log('File Content (processed or ready for digestion):', this.fileContent ? 'Content available' : 'No content');

    // In a real application, you would send this.fileContent to your backend
    // for actual file digestion and processing.
    alert(`File "${this.fileName}" digestion process initiated!`);
    // Optionally, reset after completion
    this.resetForm();
  }

  private resetForm(): void {
    this.selectedFile = null;
    this.fileName = null;
    this.fileContent = null;
    this.uploading = false;
    this.uploadProgress = 0;
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = ''; // Clear the file input
    }
  }
}