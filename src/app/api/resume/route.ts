// // app/api/resume/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();
        console.log(body);

        // Extract the first key and its value
        const templateName = Object.keys(body)[0];
        const templateData = body[templateName];

        // Validate input
        if (!templateName || !templateData) {
            return NextResponse.json(
                { message: 'Invalid data: template name and data are required' },
                { status: 400 }
            );
        }

        // Find the user in the database
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Save resume to database
        const savedResume = await prisma.resume.create({
            data: {
                userId: user.id,
                templateName,
                resumeData: templateData as any,
            },
        });

        // Respond with success
        return NextResponse.json(
            {
                message: 'Resume saved successfully',
                resumeId: savedResume.id,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error saving resume:', error);

        // Handle server error
        return NextResponse.json(
            {
                message: 'Internal Server Error',
                error:
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred',
            },
            { status: 500 }
        );
    }
}


export async function GET() {
    const { userId } = await auth(); // This returns a string or null

    if (!userId) {
        throw new Error('User not authenticated');
    }

    try {
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: {
                resumes: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        return NextResponse.json(
            {
                message: 'Resume Data recived successfully',
                resumeData: user?.resumes || [],
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching user resumes:', error);
        return NextResponse.json(
            {
                message: 'Internal Server Error',
                error:
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred',
            },
            { status: 500 }
        );
    }
}
