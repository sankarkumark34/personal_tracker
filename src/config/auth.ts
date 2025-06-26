export const AUTH_CONFIG = {
  GOOGLE_CLIENT_ID: '742476350516-m5l1afteipta2hb7j2vd3d6e45j2s7ic.apps.googleusercontent.com',
  GOOGLE_REDIRECT_URI: window.location.origin,
  GOOGLE_SCOPE: 'openid email profile',
} as const;

export const OAUTH_ENDPOINTS = {
  GOOGLE_AUTH_URL: 'https://accounts.google.com/oauth/authorize',
  GOOGLE_TOKEN_URL: 'https://oauth2.googleapis.com/token',
  GOOGLE_USER_INFO: 'https://www.googleapis.com/oauth2/v2/userinfo',
} as const; 