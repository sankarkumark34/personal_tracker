import type { LoginCredentials, SignUpCredentials, ForgotPasswordData, User } from '../types/auth';

// Dummy user data for testing
const DUMMY_USERS = [
  {
    id: '1',
    email: 'admin@gmail.com',
    password: '123456',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: '123456',
    name: 'Test User'
  }
];

export class AuthService {
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; message: string }> {
    await this.delay(1000);

    const user = DUMMY_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        user: userWithoutPassword,
        message: 'Login successful!'
      };
    }

    return {
      success: false,
      message: 'Invalid email or password'
    };
  }

  async signUp(credentials: SignUpCredentials): Promise<{ success: boolean; user?: User; message: string }> {
    await this.delay(1500);

    const existingUser = DUMMY_USERS.find(u => u.email === credentials.email);
    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists'
      };
    }

    const newUser: User = {
      id: String(DUMMY_USERS.length + 1),
      email: credentials.email,
      name: credentials.email.split('@')[0]
    };

    return {
      success: true,
      user: newUser,
      message: 'Account created successfully!'
    };
  }

  async forgotPassword(data: ForgotPasswordData): Promise<{ success: boolean; message: string }> {
    await this.delay(1000);

    const user = DUMMY_USERS.find(u => u.email === data.email);
    if (user) {
      return {
        success: true,
        message: 'Password reset link sent to your email!'
      };
    }

    return {
      success: false,
      message: 'No account found with this email address'
    };
  }

  async googleAuth(): Promise<{ success: boolean; user?: User; message: string }> {
    await this.delay(1500);

    const googleUser: User = {
      id: 'google_' + Date.now(),
      email: 'user@gmail.com',
      name: 'Google User',
      avatar: 'https://via.placeholder.com/40'
    };

    return {
      success: true,
      user: googleUser,
      message: 'Google login successful!'
    };
  }
}

export const authService = new AuthService(); 