import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api, RunResult, CertifyResult } from '../api';

type ExamState = 'idle' | 'running' | 'passed' | 'failed' | 'certifying' | 'certified';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam.html',
  styleUrl: './exam.css',
})
export class Exam {
  private readonly api = inject(Api);
  private readonly router = inject(Router);

  // Form fields
  username = signal('');
  code = signal(`# Write a function called 'sum' that takes two numbers and returns their sum
# Example: sum(5, 10) should return 15

def sum(a, b):
    # Your code here
    pass
`);

  // State
  state = signal<ExamState>('idle');
  output = signal('');
  error = signal('');
  audit = signal('');
  certId = signal('');

  // Challenge info
  readonly challenge = {
    title: 'Basic Sum Function',
    description: 'Write a Python function called `sum` that takes two numbers as parameters and returns their sum.',
    example: 'sum(5, 10) → 15',
    difficulty: 'Easy',
    timeLimit: 'No limit',
    language: 'Python',
  };

  runCode(): void {
    if (!this.username().trim()) {
      this.error.set('Please enter your name before submitting.');
      return;
    }

    if (!this.code().trim()) {
      this.error.set('Please write some code before submitting.');
      return;
    }

    this.state.set('running');
    this.error.set('');
    this.output.set('');
    this.audit.set('');

    this.api.runCode({ code: this.code(), username: this.username() }).subscribe({
      next: (result: RunResult) => {
        this.output.set(result.output);
        
        if (result.error) {
          this.error.set(result.error);
        }

        if (result.passed) {
          this.state.set('passed');
          if (result.audit) {
            this.audit.set(result.audit);
          }
        } else {
          this.state.set('failed');
        }
      },
      error: (err) => {
        this.state.set('failed');
        this.error.set(err.message || 'Failed to execute code. Please try again.');
      },
    });
  }

  getCertificate(): void {
    this.state.set('certifying');

    this.api.certify({ 
      code: this.code(), 
      username: this.username(), 
      audit: this.audit() 
    }).subscribe({
      next: (result: CertifyResult) => {
        this.certId.set(result.cert_id);
        this.state.set('certified');
      },
      error: (err) => {
        this.state.set('passed'); // Go back to passed state
        this.error.set(err.message || 'Failed to mint certificate. Please try again.');
      },
    });
  }

  viewCertificate(): void {
    this.router.navigate(['/verify', this.certId()]);
  }

  resetExam(): void {
    this.state.set('idle');
    this.output.set('');
    this.error.set('');
    this.audit.set('');
    this.certId.set('');
    this.code.set(`# Write a function called 'sum' that takes two numbers and returns their sum
# Example: sum(5, 10) should return 15

def sum(a, b):
    # Your code here
    pass
`);
  }

  onCodeInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.code.set(textarea.value);
  }

  onUsernameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
  }
}
