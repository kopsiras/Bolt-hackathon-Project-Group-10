import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  message: string | null = null;
  isSuccess: boolean = false;
  // New property for password visibility
  passwordFieldType: string = 'password';

  // --- DEMO CREDENTIALS FOR SUCCESSFUL SIGNUP ---
  private readonly DEMO_EMAIL = 'n@l.com';
  private readonly DEMO_USERNAME = 'nl';
  private readonly DEMO_PASSWORD = '123456';
  // --- END DEMO CREDENTIALS ---

  constructor(private router: Router) {}

  onSubmit() {
    this.message = null;
    this.isSuccess = false;

    console.log('Signup attempt:', {
      email: this.email,
      username: this.username,
      password: this.password
    });

    if (!this.email || !this.username || !this.password) {
      this.message = 'All fields are required.';
      this.isSuccess = false;
      this.clearMessageAfterDelay();
      return;
    }

    // Optional: Basic email format validation
    if (!this.email.includes('@') || !this.email.includes('.')) {
        this.message = 'Please enter a valid email address.';
        this.isSuccess = false;
        this.clearMessageAfterDelay();
        return;
    }

    setTimeout(() => {
      // --- DEMO SUCCESS LOGIC ---
      // For demo, if the entered credentials match the demo ones, it's considered successful.
      // In a real application, this would be an API call to register the user.
      if (this.email === this.DEMO_EMAIL && this.username === this.DEMO_USERNAME && this.password === this.DEMO_PASSWORD) {
        this.message = 'Account created successfully! Redirecting to login...';
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        // You might want to make this more generic for different demo inputs,
        // or keep it strict if only 'nl'/'123456' should work.
        this.message = 'Signup failed. Please try again with demo credentials.';
        this.isSuccess = false;
      }
      // --- END DEMO SUCCESS LOGIC ---

      if (!this.isSuccess) {
        this.clearMessageAfterDelay();
      }
    }, 1000);
  }

  private clearMessageAfterDelay(): void {
    setTimeout(() => {
      this.message = null;
      console.log('Signup result message cleared after timeout.');
    }, 3000);
  }

  // New method for toggling password visibility (if you add the eye icon)
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}