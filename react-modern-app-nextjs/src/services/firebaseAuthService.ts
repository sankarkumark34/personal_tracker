import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '@/config/firebase';
import type { LoginCredentials, SignUpCredentials, ForgotPasswordData, User } from '@/types/auth';

// Firebase Error Type Definition
interface FirebaseError {
  code?: string;
  message?: string;
}

export class FirebaseAuthService {
  // Firebase User ah namma User type kku convert pannalam
  private mapFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
      avatar: firebaseUser.photoURL || undefined
    };
  }

  // Email & Password Login
  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; message: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        credentials.email, 
        credentials.password
      );
      
      const user = this.mapFirebaseUser(userCredential.user);
      
      return {
        success: true,
        user,
        message: 'Login successful!'
      };
    } catch (error: unknown) {
      let message = 'Login failed. Please try again.';
      
      // Firebase error codes handle pannalam
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          message = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many failed attempts. Please try again later.';
          break;
        default:
          message = firebaseError.message || 'Login failed. Please try again.';
      }
      
      return {
        success: false,
        message
      };
    }
  }

  // Email & Password Sign Up
  async signUp(credentials: SignUpCredentials): Promise<{ success: boolean; user?: User; message: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        credentials.email, 
        credentials.password
      );
      
      // User profile update pannalam (name set pannalam)
      if (credentials.name) {
        await updateProfile(userCredential.user, {
          displayName: credentials.name
        });
      }
      
      const user = this.mapFirebaseUser(userCredential.user);
      
      return {
        success: true,
        user,
        message: 'Account created successfully!'
      };
    } catch (error: unknown) {
      let message = 'Sign up failed. Please try again.';
      
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          message = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          message = 'Password should be at least 6 characters.';
          break;
        default:
          message = firebaseError.message || 'Sign up failed. Please try again.';
      }
      
      return {
        success: false,
        message
      };
    }
  }

  // Forgot Password
  async forgotPassword(data: ForgotPasswordData): Promise<{ success: boolean; message: string }> {
    try {
      await sendPasswordResetEmail(auth, data.email);
      
      return {
        success: true,
        message: 'Password reset link sent to your email!'
      };
    } catch (error: unknown) {
      let message = 'Failed to send reset email. Please try again.';
      
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        default:
          message = firebaseError.message || 'Failed to send reset email. Please try again.';
      }
      
      return {
        success: false,
        message
      };
    }
  }

  // Google Authentication
  async googleAuth(): Promise<{ success: boolean; user?: User; message: string }> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = this.mapFirebaseUser(result.user);
      
      return {
        success: true,
        user,
        message: 'Google login successful!'
      };
    } catch (error: unknown) {
      let message = 'Google login failed. Please try again.';
      
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/popup-closed-by-user':
          message = 'Login cancelled by user.';
          break;
        case 'auth/popup-blocked':
          message = 'Popup blocked. Please allow popups and try again.';
          break;
        default:
          message = firebaseError.message || 'Google login failed. Please try again.';
      }
      
      return {
        success: false,
        message
      };
    }
  }

  // Logout
  async logout(): Promise<{ success: boolean; message: string }> {
    try {
      await signOut(auth);
      return {
        success: true,
        message: 'Logged out successfully!'
      };
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      return {
        success: false,
        message: firebaseError.message || 'Logout failed. Please try again.'
      };
    }
  }

  // Current User Get Pannalam
  getCurrentUser(): User | null {
    if (auth.currentUser) {
      return this.mapFirebaseUser(auth.currentUser);
    }
    return null;
  }

  // Auth State Change Listener
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        callback(this.mapFirebaseUser(firebaseUser));
      } else {
        callback(null);
      }
    });
  }
}

export const firebaseAuthService = new FirebaseAuthService(); 