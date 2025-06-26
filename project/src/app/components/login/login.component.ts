import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string | null = null;
  isSuccess: boolean = false;
  // New property for password visibility
  passwordFieldType: string = 'password';

  // --- UPDATED CREDENTIALS FOR DEMO ---
  private readonly VALID_USERNAME = 'test';
  private readonly VALID_PASSWORD = '123456';
  // --- END UPDATED CREDENTIALS ---

  constructor(private router: Router) {}

  onSubmit() {
    this.message = null;
    this.isSuccess = false;

    console.log('Login attempt:', { username: this.username, password: this.password });

    if (!this.username || !this.password) {
      this.message = 'All fields are required.';
      this.isSuccess = false;
      this.clearMessageAfterDelay();
      return;
    }

    setTimeout(() => {
      if (this.username === this.VALID_USERNAME && this.password === this.VALID_PASSWORD) {
        this.message = 'Login successful! Redirecting...';
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.message = 'Invalid username or password.';
        this.isSuccess = false;
      }

      if (!this.isSuccess) {
        this.clearMessageAfterDelay();
      }
    }, 1000);
  }

  private clearMessageAfterDelay(): void {
    setTimeout(() => {
      this.message = null;
      console.log('Login result message cleared after timeout.');
    }, 3000);
  }

  // New method for toggling password visibility (if you add the eye icon)
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}