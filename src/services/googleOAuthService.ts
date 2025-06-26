import { AUTH_CONFIG, OAUTH_ENDPOINTS } from '../config/auth';
import type { User } from '../types/auth';

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
  id_token?: string;
}

export class GoogleOAuthService {
  private clientId = AUTH_CONFIG.GOOGLE_CLIENT_ID;
  private redirectUri = AUTH_CONFIG.GOOGLE_REDIRECT_URI;
  private scope = AUTH_CONFIG.GOOGLE_SCOPE;

  // Generate random state for security
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Create Google OAuth URL
  private createAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: this.scope,
      state: state,
      access_type: 'offline',
      prompt: 'consent'
    });

    return `${OAUTH_ENDPOINTS.GOOGLE_AUTH_URL}?${params.toString()}`;
  }

  // Initiate Google OAuth flow
  async initiateLogin(): Promise<void> {
    console.log('🔍 GoogleOAuthService.initiateLogin() called');
    try {
      const state = this.generateState();
      console.log('🔑 Generated state:', state);
      
      // Store state in sessionStorage for verification
      sessionStorage.setItem('oauth_state', state);
      
      // Create auth URL
      const authUrl = this.createAuthUrl(state);
      console.log('🌐 Generated auth URL:', authUrl);
      
      // Redirect to Google OAuth
      console.log('🚀 Redirecting to Google OAuth...');
      window.location.href = authUrl;
    } catch (error) {
      console.error('❌ Error in GoogleOAuthService.initiateLogin():', error);
      throw new Error('Failed to initiate Google login');
    }
  }

  // Handle OAuth callback
  async handleCallback(): Promise<{ success: boolean; user?: User; message: string }> {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const error = urlParams.get('error');

      // Check for errors
      if (error) {
        return {
          success: false,
          message: `OAuth error: ${error}`
        };
      }

      // Verify state
      const storedState = sessionStorage.getItem('oauth_state');
      if (!state || state !== storedState) {
        return {
          success: false,
          message: 'Invalid state parameter'
        };
      }

      // Clear stored state
      sessionStorage.removeItem('oauth_state');

      if (!code) {
        return {
          success: false,
          message: 'No authorization code received'
        };
      }

      // Exchange code for tokens
      const tokenResponse = await this.exchangeCodeForTokens(code);
      
      // Get user info
      const userInfo = await this.getUserInfo(tokenResponse.access_token);
      
      // Convert to our User type
      const user: User = {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.picture
      };

      return {
        success: true,
        user,
        message: 'Google login successful!'
      };

    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      return {
        success: false,
        message: 'Failed to complete Google login'
      };
    }
  }

  // Exchange authorization code for tokens
  private async exchangeCodeForTokens(code: string): Promise<GoogleTokenResponse> {
    const response = await fetch(OAUTH_ENDPOINTS.GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: '', // Note: For production, you'd need a backend for this
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    return await response.json();
  }

  // Get user information from Google
  private async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    const response = await fetch(OAUTH_ENDPOINTS.GOOGLE_USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return await response.json();
  }

  // Check if current URL is OAuth callback
  isOAuthCallback(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('code') || urlParams.has('error');
  }

  // Clean OAuth parameters from URL
  cleanupUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('code');
    url.searchParams.delete('state');
    url.searchParams.delete('scope');
    url.searchParams.delete('authuser');
    url.searchParams.delete('prompt');
    
    window.history.replaceState({}, document.title, url.pathname);
  }
}

export const googleOAuthService = new GoogleOAuthService(); 