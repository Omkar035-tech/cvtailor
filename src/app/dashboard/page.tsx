"use client"
import React, { useState, useEffect } from 'react';
import { EllipsisVertical, Plus } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Link from 'next/link';
import Templates from '@/templates/templates';
// import { useRouter } from 'next/router';
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom/client';

const ResumePreview = ({ resume }) => {
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        const generatePreview = async () => {
            // Create a hidden div for rendering
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.style.width = '800px'; // Set a fixed width for consistent rendering
            document.body.appendChild(tempDiv);

            // Render the template
            const root = ReactDOM.createRoot(tempDiv);
            root.render(
                <Templates
                    name={resume.templateName}
                    data={resume.resumeData}
                />
            );

            // Wait for rendering and fonts to load
            await new Promise(resolve => setTimeout(resolve, 100));

            try {
                // Use html2canvas to capture the rendered template
                const canvas = await html2canvas(tempDiv, {
                    scale: 1,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });

                setPreviewUrl(canvas.toDataURL());
            } catch (error) {
                console.error('Error generating preview:', error);
            } finally {
                // Cleanup
                document.body.removeChild(tempDiv);
            }
        };

        generatePreview();
    }, [resume]);

    return (
        <div className="w-full h-full">
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="Resume preview"
                    className="w-full h-full object-contain"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    Loading preview...
                </div>
            )}
        </div>
    );
};

const DashboardPage = () => {
    // const router = useRouter();
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Fetch resumes on component mount

    React.useEffect(() => {
        const loadResumes = async () => {
            try {
                const response = await fetch('/api/resume', {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error('Failed to save resume');
                }

                const result = await response.json();
                setResumes(result.resumeData)
            } catch (error) {
                console.error('Error saving resume:', error);
            }
        };
        loadResumes();
    }, []);

    const handleDelete = async (resumeId: string) => {
        console.log(resumeId)
        try {
            const response = await fetch(`/api/resume/delete/${resumeId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to save resume');
            }

            const result = await response.json();
            console.log(result)
            setResumes(resumes.filter(resume => resume.id !== resumeId));
            setShowDeleteDialog(false);
        } catch (error) {
            console.error('Error saving resume:', error);
        }
    };

    const handleDownload = async (resumeId: string) => {
        console.log(resumeId)
        // try {
        //     const response = await fetch(`/api/download-resume/${resumeId}`);
        //     const blob = await response.blob();
        //     const url = window.URL.createObjectURL(blob);
        //     const a = document.createElement('a');
        //     a.href = url;
        //     a.download = 'resume.pdf';
        //     document.body.appendChild(a);
        //     a.click();
        //     window.URL.revokeObjectURL(url);
        //     document.body.removeChild(a);
        // } catch (error) {
        //     console.error('Error downloading resume:', error);
        // }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Resumes</h1>
            <div className="flex flex-wrap justify-start items-center gap-6">
                {/* New Resume Card */}
                <Card className="h-[460px] w-[300px] flex items-center justify-center hover:shadow-lg transition-shadow">
                    <Link href="/create">
                        <div className="flex flex-col items-center">
                            <Plus className="h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-gray-500">Create New Resume</p>
                        </div>
                    </Link>
                </Card>

                {/* Existing Resume Cards */}
                {resumes.map((resume) => (
                    <Card key={resume.id} className="h-[460px] w-[300px] relative">
                        <CardContent className="pt-6">
                            <h2 className="text-xl font-semibold mb-2 capitalize">
                                {resume.templateName.replace("_", " ") || 'Untitled Resume'}
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">
                                Created on: {new Date(resume.createdAt).toLocaleDateString()}
                            </p>

                            {/* Resume Preview */}
                            {/* <div className="h-[280px] w-full border rounded-lg overflow-hidden">
                                <iframe
                                    srcDoc={resume.htmlContent}
                                    className="w-full h-full transform scale-[0.4] origin-top-left"
                                    style={{ width: '250%', height: '250%' }}
                                />
                            </div> */}
                            <div className="h-[280px] w-full border rounded-lg overflow-hidden bg-white">
                                <ResumePreview resume={resume} />
                            </div>
                        </CardContent>

                        <CardFooter className="absolute bottom-0 left-0 right-0 p-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-15 flex items-end">
                                        <EllipsisVertical size={20} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => {
                                        setSelectedResume(resume);
                                        setShowPreviewModal(true);
                                    }}>
                                        View
                                    </DropdownMenuItem>
                                    {/* <DropdownMenuItem>
                                        Update
                                    </DropdownMenuItem> */}
                                    <DropdownMenuItem onClick={() => {
                                        setSelectedResume(resume);
                                        setShowDeleteDialog(true);
                                    }}>
                                        Delete
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDownload(resume.id)}>
                                        Download
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Preview Modal */}
            <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
                <DialogContent className="max-w-4xl h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>{selectedResume?.templateName || 'Resume Preview'}</DialogTitle>
                        {console.log(selectedResume)}
                    </DialogHeader>
                    <div className="h-full w-full overflow-auto">
                        {/* <iframe
                            srcDoc={selectedResume?.htmlContent}
                            className="w-full h-full"
                        /> */}
                        <div className=" w-full border rounded-lg overflow-hidden bg-white">
                            <ResumePreview resume={selectedResume} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this resume?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your resume.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDelete(selectedResume?.id)}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DashboardPage;


