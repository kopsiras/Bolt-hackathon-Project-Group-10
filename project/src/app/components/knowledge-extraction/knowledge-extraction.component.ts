import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-knowledge-extraction',
  standalone: true, // Assuming it's a standalone component
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './knowledge-extraction.component.html',
  styleUrls: ['./knowledge-extraction.component.css']
})
export class KnowledgeExtractionComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Access hidden file input

  wordsPerChunk: string = '';
  tagging: string = '';
  selectedFile: File | null = null;
  fileName: string | null = null;
  fileContent: string | ArrayBuffer | null = null; // To store file content

  uploading: boolean = false;
  uploadProgress: number = 0;

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
      this.uploading = false;
      this.uploadProgress = 0;
      console.log('No file selected.');
    }
  }

  private readFileContent(file: File): void {
    const reader = new FileReader();

    // Read as text for common text formats. For PDFs/DOCX, you'd need a backend service or a library.
    if (file.type.startsWith('text/') || file.type.includes('json') || file.type.includes('xml') || file.type.includes('log')) {
      reader.readAsText(file);
    } else {
      // For binary files, you'd typically send them to a backend for extraction.
      console.warn('File type not directly readable as text by FileReader for extraction:', file.type);
      // You might store as DataURL or just set fileContent to null if you expect only text
      this.fileContent = `Content of "${file.name}" is a binary type (${file.type}). For knowledge extraction, its text content would typically be processed by a backend.`;
      return;
    }

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && typeof e.target.result === 'string') {
        this.fileContent = e.target.result; // Store the content
        console.log('File content loaded for knowledge extraction.');
      }
    };

    reader.onerror = (e) => {
      console.error('Error reading file for knowledge extraction:', reader.error);
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
    if (!this.wordsPerChunk) {
        alert('Please enter "Words per chunk".');
        return;
    }
    if (!this.tagging) {
        alert('Please enter "Tagging" information.');
        return;
    }
    // Check if fileContent is suitable for extraction
    if (!this.fileContent || (typeof this.fileContent === 'string' && this.fileContent.includes('binary type'))) {
      alert('File content is not suitable for direct text-based knowledge extraction. Please upload a compatible text file or ensure backend processing for binary files.');
      return;
    }


    console.log('Words per chunk:', this.wordsPerChunk);
    console.log('Tagging:', this.tagging);
    console.log('Selected File for Extraction:', this.fileName);
    console.log('File Content (first 200 chars):', typeof this.fileContent === 'string' ? this.fileContent.substring(0, 200) + '...' : 'Binary Content');

    // In a real application, you would send this.fileContent,
    // this.wordsPerChunk, and this.tagging to a backend API for processing.
    alert('Knowledge extraction and structuring complete!');
    this.resetForm();
  }

  private resetForm(): void {
    this.wordsPerChunk = '';
    this.tagging = '';
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