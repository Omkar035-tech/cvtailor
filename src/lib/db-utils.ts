import prisma from './db'
import { auth } from '@clerk/nextjs/server'

type ResumeData = {
    template_simple_01: {
        name: string;
        road: string;
        phone: string;
        email: string;
        objective: string;
        experience: Array<{
            experience_comp_name: string;
            experience_date: string;
            experience_desc: string;
        }>;
        education: Array<{
            education_header: string;
            education_date: string;
            education_desc: string;
        }>;
        skills: string[];
    }
};

// export async function saveResume(resumeData: ResumeData, templateName: string) {
//     const { userId } = auth();

//     if (!userId) {
//         console.log(userId)
//         throw new Error('User not authenticated');
//     }

//     try {
//         const user = await prisma.user.findUnique({
//             where: { clerkId: userId }
//         });

//         if (!user) {
//             throw new Error('User not found');
//         }

//         const resume = await prisma.resume.create({
//             data: {
//                 userId: user.id,
//                 templateName,
//                 resumeData: resumeData as any
//             }
//         });

//         return resume.id;
//     } catch (error) {
//         console.error('Error saving resume:', error);
//         throw error;
//     }
// }

// export async function getUserResumes() {
//     const { userId } = auth();

//     if (!userId) {
//         throw new Error('User not authenticated');
//     }

//     try {
//         const user = await prisma.user.findUnique({
//             where: { clerkId: userId },
//             include: {
//                 resumes: {
//                     orderBy: { createdAt: 'desc' }
//                 }
//             }
//         });

//         return user?.resumes || [];
//     } catch (error) {
//         console.error('Error fetching user resumes:', error);
//         throw error;
//     }
// }


export async function saveResume(resumeData: ResumeData, templateName: string) {
    const { userId } = await auth(); // This returns a string or null

    if (!userId) {
        throw new Error('User not authenticated');
    }

    try {
        const user = await prisma.user.findUnique({
            where: { clerkId: userId }
        });

        if (!user) {
            throw new Error('User not found');
        }

        const resume = await prisma.resume.create({
            data: {
                userId: user.id,
                templateName,
                resumeData: resumeData as any
            }
        });

        return resume.id;
    } catch (error) {
        console.error('Error saving resume:', error);
        throw error;
    }
}
