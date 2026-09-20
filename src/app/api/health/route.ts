import { NextResponse } from 'next/server';
import { createApiResponse } from '@/utils/api';

export async function GET() {
    try {
        return NextResponse.json(
            createApiResponse(true, { status: 'ok' }, undefined, 200),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            createApiResponse(false, undefined, 'Health check failed', 500),
            { status: 500 }
        );
    }
}
