import { NextRequest, NextResponse } from 'next/server';
import { firebaseAuthService } from '@/services/firebaseAuthService';
import type { LoginCredentials } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();
    
    // Validate request body
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Attempt login using Firebase Auth Service
    const result = await firebaseAuthService.login(body);
    
    if (result.success && result.user) {
      return NextResponse.json({
        success: true,
        user: result.user,
        message: result.message
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 