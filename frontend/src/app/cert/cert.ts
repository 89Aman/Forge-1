import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api, Certificate } from '../api';

type CertState = 'idle' | 'loading' | 'found' | 'not-found' | 'error';

@Component({
  selector: 'app-cert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cert.html',
  styleUrl: './cert.css',
})
export class Cert implements OnInit {
  private readonly api = inject(Api);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // State
  state = signal<CertState>('idle');
  searchId = signal('');
  certificate = signal<Certificate | null>(null);
  errorMessage = signal('');

  ngOnInit(): void {
    // Check if there's an ID in the route params
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.searchId.set(id);
        this.verifyCertificate();
      }
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchId.set(input.value.toUpperCase());
  }

  verifyCertificate(): void {
    const id = this.searchId().trim();
    
    if (!id) {
      this.errorMessage.set('Please enter a certificate ID.');
      return;
    }

    this.state.set('loading');
    this.errorMessage.set('');
    this.certificate.set(null);

    this.api.verify(id).subscribe({
      next: (cert: Certificate) => {
        this.certificate.set(cert);
        this.state.set('found');
        // Update URL without navigating
        this.router.navigate(['/verify', cert.id], { replaceUrl: true });
      },
      error: (err) => {
        if (err.status === 404) {
          this.state.set('not-found');
        } else {
          this.state.set('error');
          this.errorMessage.set(err.message || 'Failed to verify certificate. Please try again.');
        }
      },
    });
  }

  searchAnother(): void {
    this.state.set('idle');
    this.searchId.set('');
    this.certificate.set(null);
    this.router.navigate(['/verify'], { replaceUrl: true });
  }

  formatTimestamp(timestamp: string): string {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return timestamp;
    }
  }
}
