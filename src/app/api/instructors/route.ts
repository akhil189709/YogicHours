import { NextResponse } from 'next/server';
import { createApiResponse } from '@/utils/api';
import { instructors } from '@/services/db/store';

export async function GET() {
    return NextResponse.json(createApiResponse(true, { instructors }, undefined, 200), { status: 200 });
}
