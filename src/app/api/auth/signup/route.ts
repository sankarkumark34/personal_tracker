import { NextRequest, NextResponse } from 'next/server';
import { firebaseAuthService } from '@/services/firebaseAuthService';
import type { SignUpCredentials } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body: SignUpCredentials = await request.json();
    
    // Validate request body
    if (!body.email || !body.password || !body.confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Attempt signup using Firebase Auth Service
    const result = await firebaseAuthService.signUp(body);
    
    if (result.success && result.user) {
      return NextResponse.json({
        success: true,
        user: result.user,
        message: result.message
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 