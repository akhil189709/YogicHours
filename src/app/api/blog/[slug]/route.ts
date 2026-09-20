import { NextRequest, NextResponse } from 'next/server';
import { createApiResponse } from '@/utils/api';
import { blogPosts } from '@/services/db/store';

export async function GET(request: NextRequest) {
    const slug = request.nextUrl.pathname.split('/').pop() || '';
    const post = blogPosts.find((item) => item.slug === slug);

    if (!post) {
        return NextResponse.json(createApiResponse(false, undefined, 'Post not found', 404), { status: 404 });
    }

    return NextResponse.json(createApiResponse(true, { post }, undefined, 200), { status: 200 });
}
