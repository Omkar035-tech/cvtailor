

// import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import prisma from '@/lib/db';

// // Define the correct type for route parameters
// type RouteParams = {
//     params: {
//         resumeId: string;
//     };
//     searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function DELETE(
//     req: Request,
//     context: RouteParams  // Use the correct type here
// ) {
//     const { userId } = await auth();

//     if (!userId) {
//         return NextResponse.json(
//             { message: 'Unauthorized' },
//             { status: 401 }
//         );
//     }

//     try {
//         const { resumeId } = context.params;  // Access resumeId from context.params

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

// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import prisma from '@/lib/db';

// // Updated type definition for Next.js App Router
// type Props = {
//     params: {
//         resumeId: string
//     }
// }

// export async function DELETE(
//     _req: NextRequest,
//     { params }: Props
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

export async function DELETE(
    request: NextRequest,
    context: { params: { resumeId: string } }
): Promise<NextResponse> {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const resumeId = context.params.resumeId;

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