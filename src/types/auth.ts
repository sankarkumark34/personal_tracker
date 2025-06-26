export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type AuthMode = 'login' | 'signup' | 'forgot-password'; 