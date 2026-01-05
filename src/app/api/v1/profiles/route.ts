import { NextRequest, NextResponse } from 'next/server';
import { ProfileService } from '@/services/profileService';
import { ProfileRepository } from '@/repositories/profileRepository';

const profileService = new ProfileService(new ProfileRepository());

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10', 10)));

    const result = await profileService.getProfiles({ page, limit });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Profiles API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
