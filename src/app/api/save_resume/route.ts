
import { NextResponse } from 'next/server';

// POST method for saving resume data
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { template_simple_01 } = body;

        // Validate input
        if (!template_simple_01) {
            return NextResponse.json(
                { message: 'Invalid data: template_simple_01 is required' },
                { status: 400 }
            );
        }

        // Simulate saving data (replace this with actual database logic)
        console.log('Saving resume data:', template_simple_01);

        // Respond with success
        return NextResponse.json({ message: 'Resume saved successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error saving resume:', error);

        // Handle server error
        return NextResponse.json(
            {
                message: 'Internal Server Error',
            },
            { status: 500 }
        );
    }
}
