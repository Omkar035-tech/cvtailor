

// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import prisma from '@/lib/db';

// // Updated type definition for Next.js App Router

// export async function GET(
//     _req: NextRequest,
//     { params }: { params: { resumeId: string } }
// ): Promise<NextResponse> {
//     const { userId } = await auth();

//     if (!userId) {
//         return NextResponse.json(
//             { message: 'Unauthorized' },
//             { status: 401 }
//         );
//     }

//     try {
//         const resumeId = params.resumeId;

//         if (!resumeId) {
//             return NextResponse.json(
//                 { message: 'Resume ID is required' },
//                 { status: 400 }
//             );
//         }

//         // Find the user
//         const user = await prisma.user.findUnique({
//             where: { clerkId: userId },
//         });

//         if (!user) {
//             return NextResponse.json(
//                 { message: 'User not found' },
//                 { status: 404 }
//             );
//         }

//         // Check if the resume exists and belongs to the user
//         const resume = await prisma.resume.findFirst({
//             where: {
//                 id: resumeId,
//                 userId: user.id,
//             },
//         });

//         if (!resume) {
//             return NextResponse.json(
//                 { message: 'Resume not found or unauthorized' },
//                 { status: 404 }
//             );
//         }

//         // Delete the resume
//         await prisma.resume.delete({
//             where: {
//                 id: resumeId,
//             },
//         });

//         return NextResponse.json(
//             { message: 'Resume deleted successfully' },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error('Error deleting resume:', error);
//         return NextResponse.json(
//             { message: 'Internal Server Error' },
//             { status: 500 }
//         );
//     }
// }




import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

// Updated GET handler
export async function GET(req: NextRequest, context: { params: any }): Promise<NextResponse> {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Retrieve the params explicitly from the context object
        const resumeId = context?.params?.resumeId;

        if (!resumeId) {
            return NextResponse.json(
                { message: 'Resume ID is required' },
                { status: 400 }
            );
        }

        // Find the user
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Check if the resume exists and belongs to the user
        const resume = await prisma.resume.findFirst({
            where: {
                id: resumeId,
                userId: user.id,
            },
        });

        if (!resume) {
            return NextResponse.json(
                { message: 'Resume not found or unauthorized' },
                { status: 404 }
            );
        }

        // Delete the resume
        await prisma.resume.delete({
            where: {
                id: resumeId,
            },
        });

        return NextResponse.json(
            { message: 'Resume deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting resume:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
