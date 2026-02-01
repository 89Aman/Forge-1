import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CodeSubmission {
  code: string;
  username: string;
  audit?: string;
}

export interface RunResult {
  passed: boolean;
  output: string;
  error?: string;
  audit?: string;
}

export interface CertifyResult {
  cert_id: string;
  message: string;
  verify_url: string;
}

export interface Certificate {
  id: string;
  user: string;
  code_proof: string;
  ai_audit: string;
  timestamp: string;
  verified: boolean;
  platform: string;
  message: string;
}

export interface HealthResponse {
  status: string;
  database: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080';

  /**
   * Check API health status
   */
  health(): Observable<HealthResponse> {
    return this.http.get<HealthResponse>(`${this.baseUrl}/api/health`);
  }

  /**
   * Execute code in a secure sandbox and validate against test cases
   */
  runCode(submission: CodeSubmission): Observable<RunResult> {
    return this.http.post<RunResult>(`${this.baseUrl}/api/run`, submission);
  }

  /**
   * Mint a verifiable certificate for a passed code submission
   */
  certify(submission: CodeSubmission): Observable<CertifyResult> {
    return this.http.post<CertifyResult>(`${this.baseUrl}/api/certify`, submission);
  }

  /**
   * Verify a certificate by its ID
   */
  verify(certId: string): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.baseUrl}/api/verify/${certId}`);
  }
}
