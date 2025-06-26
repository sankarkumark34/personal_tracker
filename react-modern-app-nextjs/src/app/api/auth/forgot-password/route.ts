import { NextRequest, NextResponse } from 'next/server';
import { firebaseAuthService } from '@/services/firebaseAuthService';
import type { ForgotPasswordData } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const body: ForgotPasswordData = await request.json();
    
    // Validate request body
    if (!body.email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Attempt password reset using Firebase Auth Service
    const result = await firebaseAuthService.forgotPassword(body);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Forgot password API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 