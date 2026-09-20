import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { createApiResponse } from '@/utils/api';
import { healthIntakes } from '@/services/db/store';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

export async function GET() {
    return NextResponse.json(createApiResponse(true, { intakes: healthIntakes }, undefined, 200), { status: 200 });
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const name = String(formData.get('name') || '');
        const email = String(formData.get('email') || '');
        const phone = String(formData.get('phone') || '');
        const healthProblems = formData.getAll('healthProblems').map(String);
        const stressLevel = Number(formData.get('stressLevel') || 0);
        const bpHistory = String(formData.get('bpHistory') || '');
        const goals = formData.getAll('goals').map(String);
        const sleepHours = Number(formData.get('sleepHours') || 0);
        const exerciseFrequency = String(formData.get('exerciseFrequency') || '');
        const diet = String(formData.get('diet') || '');
        const waterIntake = Number(formData.get('waterIntake') || 0);
        const additionalNotes = String(formData.get('additionalNotes') || '');
        const file = formData.get('file');

        if (!name || !email || healthProblems.length === 0 || goals.length === 0) {
            return NextResponse.json(
                createApiResponse(false, undefined, 'Name, email, at least one health concern, and at least one goal are required', 400),
                { status: 400 }
            );
        }

        let fileName: string | undefined;
        let filePath: string | undefined;

        if (file instanceof File && file.size > 0) {
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(createApiResponse(false, undefined, 'File must be smaller than 5MB', 400), { status: 400 });
            }
            if (!ALLOWED_TYPES.includes(file.type)) {
                return NextResponse.json(createApiResponse(false, undefined, 'File must be a PDF, JPG, PNG, or WEBP', 400), { status: 400 });
            }

            const uploadsDir = path.join(process.cwd(), 'uploads', 'health-intake');
            await mkdir(uploadsDir, { recursive: true });

            const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
            const storedName = `${Date.now()}-${safeName}`;
            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(path.join(uploadsDir, storedName), buffer);

            fileName = file.name;
            filePath = `uploads/health-intake/${storedName}`;
        }

        const intake = {
            id: `intake-${Date.now()}`,
            name,
            email,
            phone: phone || undefined,
            healthProblems,
            stressLevel,
            bpHistory,
            goals,
            lifestyleHabits: { sleepHours, exerciseFrequency, diet, waterIntake },
            additionalNotes,
            fileName,
            filePath,
            createdAt: new Date().toISOString(),
        };

        healthIntakes.push(intake);

        return NextResponse.json(createApiResponse(true, { intake }, undefined, 201), { status: 201 });
    } catch (error) {
        return NextResponse.json(createApiResponse(false, undefined, 'Failed to submit intake form', 500), { status: 500 });
    }
}
