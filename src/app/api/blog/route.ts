import { NextResponse } from 'next/server';
import { createApiResponse } from '@/utils/api';
import { blogPosts } from '@/services/db/store';

export async function GET() {
    return NextResponse.json(createApiResponse(true, { posts: blogPosts }, undefined, 200), { status: 200 });
}
