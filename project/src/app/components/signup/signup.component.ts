// Imports necessary Angular modules and components.
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup', // Defines the selector for this component.
  standalone: true,      // Indicates that this is a standalone component.
  imports: [             // Imports modules required by this component.
    CommonModule,        // Provides common directives like ngIf, ngFor.
    FormsModule,         // Enables two-way data binding with ngModel.
    RouterModule         // Provides routing functionalities.
  ],
  templateUrl: './signup.component.html', // Links to the component's HTML template.
  styleUrls: ['./signup.component.css']   // Links to the component's CSS styles.
})
export class SignupComponent {
  // Component properties for form data and messages.
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = ''; // New property for confirm password.
  message: string | null = null;
  isSuccess: boolean = false;
  passwordMismatch: boolean = false; // New property to track password mismatch.

  // --- DEMO CREDENTIALS FOR SUCCESSFUL SIGNUP ---
  // These are for demonstration purposes only.
  // In a real application, user data would be handled securely.
  private readonly DEMO_EMAIL = 'test@1.com';
  private readonly DEMO_USERNAME = 'test';
  private readonly DEMO_PASSWORD = '123456';
  private readonly DEMO_CONFRIMPASSWORD = '123456';
  // --- END DEMO CREDENTIALS ---

  // Constructor for dependency injection, here injecting the Router service.
  constructor(private router: Router) {}

  /**
   * Handles the form submission event.
   * Performs basic validation and simulates a signup process.
   */
  onSubmit() {
    // Reset messages and flags before a new submission.
    this.message = null;
    this.isSuccess = false;
    this.passwordMismatch = false;

    // Log current form data for debugging purposes.
    console.log('Signup attempt:', {
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword // Log confirm password too.
    });

    // Validate if all required fields are filled.
    if (!this.email || !this.username || !this.password || !this.confirmPassword) {
      this.message = 'All fields are required.';
      this.isSuccess = false;
      this.clearMessageAfterDelay();
      return; // Stop execution if fields are missing.
    }

    // Optional: Basic email format validation.
    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.message = 'Please enter a valid email address.';
      this.isSuccess = false;
      this.clearMessageAfterDelay();
      return; // Stop execution if email format is invalid.
    }

    // Check if password and confirm password match.
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      this.passwordMismatch = true; // Set mismatch flag.
      this.isSuccess = false;
      this.clearMessageAfterDelay();
      return; // Stop execution if passwords don't match.
    }

    // Simulate an asynchronous operation (e.g., API call).
    setTimeout(() => {
      // --- DEMO SUCCESS LOGIC ---
      // This section simulates a successful signup based on predefined demo credentials.
      // In a real application, this would involve an actual API call to a backend
      // for user registration and authentication.
      if (
        this.email === this.DEMO_EMAIL &&
        this.username === this.DEMO_USERNAME &&
        this.password === this.DEMO_PASSWORD &&
        this.confirmPassword === this.DEMO_CONFRIMPASSWORD // Include confirm password in demo check.
      ) {
        this.message = 'Account created successfully! Redirecting to login...';
        this.isSuccess = true;
        // Redirect to the login page after a short delay on success.
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        // Handle failed signup attempt for demo purposes.
        this.message = 'Signup failed. Please try again with demo credentials.';
        this.isSuccess = false;
      }
      // --- END DEMO SUCCESS LOGIC ---

      // Clear the message after a delay if signup was not successful.
      if (!this.isSuccess) {
        this.clearMessageAfterDelay();
      }
    }, 1000); // Simulate network delay.
  }

  /**
   * Clears the displayed message after a specified delay.
   * This provides user feedback without the message persisting indefinitely.
   */
  private clearMessageAfterDelay(): void {
    setTimeout(() => {
      this.message = null;
      this.passwordMismatch = false; // Also clear password mismatch flag.
      console.log('Signup result message cleared after timeout.');
    }, 3000); // Message will disappear after 3 seconds.
  }
}
