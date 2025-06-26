import { NextRequest, NextResponse } from 'next/server';
import { firebaseAuthService } from '@/services/firebaseAuthService';

export async function POST(request: NextRequest) {
  try {
    // Attempt logout using Firebase Auth Service
    const result = await firebaseAuthService.logout();
    
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
    console.error('Logout API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 