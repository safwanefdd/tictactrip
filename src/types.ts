export interface User {
  email: string;
  token: string;
  wordCount: number;
  lastResetDate: number;
}

export interface TokenRequest {
  email: string;
}

export interface JustifyResponse {
  justifiedText: string;
}
