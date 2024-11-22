// app/api/user/sync/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import prisma from '@/lib/db';

export async function POST() {
    const { userId } = await auth();

    // Check if userId is null
    if (!userId) {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        // Fetch user details from Clerk
        const user = await clerkClient.users.getUser(userId);
        console.log(user)
        if (!user || !user.emailAddresses?.length) {
            return NextResponse.json(
                { message: 'User details not found' },
                { status: 404 }
            );
        }

        const emailAddress = user.emailAddresses[0].emailAddress;

        // Check if user already exists in the database
        const existingUser = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        // If user doesn't exist, create a new record
        if (!existingUser) {
            await prisma.user.create({
                data: {
                    clerkId: userId,
                    email: emailAddress,
                },
            });
        }

        return NextResponse.json(
            { message: 'User synchronized successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('User sync error:', error);
        return NextResponse.json(
            {
                message: 'Error synchronizing user',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
