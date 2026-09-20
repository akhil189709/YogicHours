import { NextResponse } from 'next/server';
import { createApiResponse } from '@/utils/api';
import { serviceList } from '@/services/db/store';

export async function GET() {
    return NextResponse.json(createApiResponse(true, { services: serviceList }, undefined, 200), { status: 200 });
}
