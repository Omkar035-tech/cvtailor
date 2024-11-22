"use client"

import React, { useState, useEffect, useRef } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";
import Templates from '@/templates/templates';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const FORM_STEPS = {
    TEMPLATE_SELECT: 'TEMPLATE_SELECT',
    PERSONAL: 'PERSONAL',
    EXPERIENCE: 'EXPERIENCE',
    EDUCATION: 'EDUCATION',
    SKILLS: 'SKILLS',
    PREVIEW: 'PREVIEW'
};

const templates = [
    {
        templates_name: "resume_templates_01",
        dynamic_var: {
            personal: ["name", "surname", "email", "phone", "position", "area_objective"],
            map_experience: ["job_title", "job_location", "job_period", "job_position", "job_description"],
            map_education: ["edu_institute", "edu_address", "edu_period", "edu_major", "edu_description"],
            map_skills: ["skill_head", "skill_level"],
        },
    },
    {
        templates_name: "modern_template_01",
        dynamic_var: {
            personal: ["name", "surname", "address", "landmark", "email", "phone", "twitter_link", "pinterest_link", "linkedin_link", "position", "area_objective", "logo_text"],
            map_experience: ["job_title", "job_location", "job_period", "job_position", "job_description"],
            map_education: ["edu_institute", "edu_period", "edu_major", "edu_description"],
            map_skills: ["skill_head"],
        },
    },
];

const DynamicResumeForm = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [currentStep, setCurrentStep] = useState(FORM_STEPS.TEMPLATE_SELECT);
    const [formData, setFormData] = useState({
        personal: {},
        map_experience: [],
        map_education: [],
        map_skills: []
    });
    const [previewScale, setPreviewScale] = useState(0.7);
    const previewContainerRef = useRef(null);
    const previewContentRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);



    const steps = Object.values(FORM_STEPS);

    const goToNextStep = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        }
    };

    const goToPreviousStep = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    const getTemplateVars = () => {
        const template = templates.find(t => t.templates_name === selectedTemplate);
        return template?.dynamic_var || {};
    };

    const handleTemplateSelect = (value: string) => {
        setSelectedTemplate(value);
        const templateVars = templates.find(t => t.templates_name === value)?.dynamic_var;
        if (templateVars) {
            setFormData({
                personal: templateVars.personal.reduce((acc, field) => ({ ...acc, [field]: '' }), {}),
                map_experience: [],
                map_education: [],
                map_skills: []
            });
        }
    };

    const handlePersonalChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const handleArrayFieldChange = (
        section: 'map_experience' | 'map_education' | 'map_skills',
        index: number,
        field: string,
        value: string
    ) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].map((item: any, i: number) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addNewItem = (section: 'map_experience' | 'map_education' | 'map_skills') => {
        const templateVars = getTemplateVars();
        const fields = templateVars[section];
        const newItem = fields.reduce((acc: any, field: string) => ({ ...acc, [field]: '' }), {});

        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], newItem]
        }));
    };

    const removeItem = (section: 'map_experience' | 'map_education' | 'map_skills', index: number) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].filter((_: any, i: number) => i !== index)
        }));
    };

    const handleSaveResume = async () => {
        try {
            const templateName = selectedTemplate;
            const DataToPost = {
                [templateName]: {
                    ...formData.personal,
                    map_experience: formData.map_experience,
                    map_education: formData.map_education,
                    map_skills: formData.map_skills
                }
            };

            const response = await fetch('/api/resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(DataToPost)
            });

            if (!response.ok) {
                throw new Error('Failed to save resume');
            }

            const result = await response.json();
        } catch (error) {
            console.error('Error saving resume:', error);
        }
    };

    const renderForm = () => {
        const templateVars = getTemplateVars();

        switch (currentStep) {
            case FORM_STEPS.TEMPLATE_SELECT:
                return (
                    <div className="space-y-4">
                        <Label>Select Resume Template</Label>
                        <Select onValueChange={handleTemplateSelect} value={selectedTemplate}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a template" />
                            </SelectTrigger>
                            <SelectContent>
                                {templates.map(template => (
                                    <SelectItem key={template.templates_name} value={template.templates_name}>
                                        {template.templates_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {selectedTemplate && (
                            <Button
                                onClick={goToNextStep}
                                className="mt-4"
                            >
                                Continue <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                );

            case FORM_STEPS.PERSONAL:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Personal Information</h2>
                        {templateVars.personal.map((field: string) => (
                            <div key={field}>
                                <Label>{field.replace(/_/g, ' ').toUpperCase()}</Label>
                                {field.includes('objective') ? (
                                    <Textarea
                                        value={formData.personal[field] || ''}
                                        onChange={e => handlePersonalChange(field, e.target.value)}
                                    />
                                ) : (
                                    <Input
                                        value={formData.personal[field] || ''}
                                        onChange={e => handlePersonalChange(field, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                        <div className="flex justify-between mt-4">
                            <Button onClick={goToPreviousStep}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                            <Button onClick={goToNextStep}>
                                Continue <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                );

            case FORM_STEPS.EXPERIENCE:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Experience</h2>
                        {formData.map_experience.map((exp: any, index: number) => (
                            <Card key={index} className="p-4 space-y-4">
                                {templateVars.map_experience.map((field: string) => (
                                    <div key={field}>
                                        <Label>{field.replace(/_/g, ' ').toUpperCase()}</Label>
                                        {field.includes('description') ? (
                                            <Textarea
                                                value={exp[field] || ''}
                                                onChange={e => handleArrayFieldChange('map_experience', index, field, e.target.value)}
                                            />
                                        ) : (
                                            <Input
                                                value={exp[field] || ''}
                                                onChange={e => handleArrayFieldChange('map_experience', index, field, e.target.value)}
                                            />
                                        )}
                                    </div>
                                ))}
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeItem('map_experience', index)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Remove Experience
                                </Button>
                            </Card>
                        ))}
                        <Button
                            variant="outline"
                            onClick={() => addNewItem('map_experience')}
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add Experience
                        </Button>
                        <div className="flex justify-between mt-4">
                            <Button onClick={goToPreviousStep}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                            <Button onClick={goToNextStep}>
                                Continue <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                );

            case FORM_STEPS.EDUCATION:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Education</h2>
                        {formData.map_education.map((edu: any, index: number) => (
                            <Card key={index} className="p-4 space-y-4">
                                {templateVars.map_education.map((field: string) => (
                                    <div key={field}>
                                        <Label>{field.replace(/_/g, ' ').toUpperCase()}</Label>
                                        {field.includes('description') ? (
                                            <Textarea
                                                value={edu[field] || ''}
                                                onChange={e => handleArrayFieldChange('map_education', index, field, e.target.value)}
                                            />
                                        ) : (
                                            <Input
                                                value={edu[field] || ''}
                                                onChange={e => handleArrayFieldChange('map_education', index, field, e.target.value)}
                                            />
                                        )}
                                    </div>
                                ))}
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeItem('map_education', index)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Remove Education
                                </Button>
                            </Card>
                        ))}
                        <Button
                            variant="outline"
                            onClick={() => addNewItem('map_education')}
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add Education
                        </Button>
                        <div className="flex justify-between mt-4">
                            <Button onClick={goToPreviousStep}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                            <Button onClick={goToNextStep}>
                                Continue <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                );

            case FORM_STEPS.SKILLS:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Skills</h2>
                        {formData.map_skills.map((skill: any, index: number) => (
                            <Card key={index} className="p-4 space-y-4">
                                {templateVars.map_skills.map((field: string) => (
                                    <div key={field}>
                                        <Label>{field.replace(/_/g, ' ').toUpperCase()}</Label>
                                        <Input
                                            value={skill[field] || ''}
                                            onChange={e => handleArrayFieldChange('map_skills', index, field, e.target.value)}
                                        />
                                        {field === 'skill_level' && (
                                            <input
                                                type="range"
                                                min="1"
                                                max="5"
                                                value={skill[field] || 1}
                                                onChange={e => handleArrayFieldChange('map_skills', index, field, e.target.value)}
                                                className="w-full mt-2"
                                            />
                                        )}
                                    </div>
                                ))}
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeItem('map_skills', index)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Remove Skill
                                </Button>
                            </Card>
                        ))}
                        <Button
                            variant="outline"
                            onClick={() => addNewItem('map_skills')}
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add Skill
                        </Button>
                        <div className="flex justify-between mt-4">
                            <Button onClick={goToPreviousStep}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                            <Button onClick={goToNextStep}>
                                Preview <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                );

            case FORM_STEPS.PREVIEW:
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Button onClick={goToPreviousStep}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Back to Edit
                            </Button>
                            {/* <Button onClick={handleDownloadResume}>
                                Download
                            </Button>
                            <Button onClick={handleSaveResume}>
                                Save Resume
                            </Button> */}

                            <div className="space-x-2">
                                <Button
                                    onClick={handleDownloadResume}
                                    disabled={isDownloading}
                                    className="relative"
                                >
                                    {isDownloading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Generating PDF...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4 mr-2" /> Download PDF
                                        </>
                                    )}
                                </Button>
                                <Button onClick={handleSaveResume}>
                                    Save Resume
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };




    const calculateOptimalScale = () => {
        if (!previewContainerRef.current || !previewContentRef.current) return;

        const containerWidth = previewContainerRef.current.offsetWidth;
        const contentWidth = 816; // Standard A4 width in pixels (assuming template is A4)
        const minScale = 0.3; // Minimum scale to ensure visibility
        const maxScale = 1; // Maximum scale (original size)

        let newScale = (containerWidth / contentWidth) * 0.95; // 95% of container width
        newScale = Math.min(Math.max(newScale, minScale), maxScale); // Clamp between min and max

        setPreviewScale(newScale);
    };

    // Add resize observer to handle container size changes
    useEffect(() => {
        if (!previewContainerRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            calculateOptimalScale();
        });

        resizeObserver.observe(previewContainerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    // Add event listener for window resize
    useEffect(() => {
        window.addEventListener('resize', calculateOptimalScale);
        return () => window.removeEventListener('resize', calculateOptimalScale);
    }, []);

    // Zoom controls
    const handleZoomIn = () => {
        setPreviewScale(prev => Math.min(prev + 0.1, 1));
    };

    const handleZoomOut = () => {
        setPreviewScale(prev => Math.max(prev - 0.1, 0.3));
    };

    // const renderPreview = () => {
    //     if (!selectedTemplate) return null;

    //     return (
    //         <div className="border rounded-lg p-4 bg-white shadow-sm">
    //             <h3 className="text-lg font-semibold mb-4">Real-time Preview</h3>
    //             <div className="transform scale-[0.7] origin-top">
    //                 <Templates
    //                     name={selectedTemplate}
    //                     data={{
    //                         ...formData.personal,
    //                         map_experience: formData.map_experience,
    //                         map_education: formData.map_education,
    //                         map_skills: formData.map_skills
    //                     }}
    //                 />
    //             </div>
    //         </div>
    //     );
    // };


    const handleDownloadResume = async () => {
        if (!previewContentRef.current) return;

        setIsDownloading(true);
        try {
            // Reset scale to 1 temporarily for high-quality capture
            const originalScale = previewScale;
            const previewElement = previewContentRef.current;
            previewElement.style.transform = 'scale(1)';

            const canvas = await html2canvas(previewElement, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                logging: false,
                windowWidth: 816, // A4 width in pixels
                windowHeight: 1056, // A4 height in pixels
            });

            // Create PDF with A4 dimensions
            const pdf = new jsPDF('p', 'pt', 'a4');
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), '', 'FAST');

            // Download PDF
            pdf.save(`${formData.personal.name || 'resume'}.pdf`);

            // Restore original scale
            previewElement.style.transform = `scale(${originalScale})`;
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    // Modified renderPreview function
    const renderPreview = () => {
        if (!selectedTemplate) return null;

        return (
            <div className="flex flex-col h-full">
                {/* Zoom controls */}
                <div className="flex justify-end gap-2 mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomOut}
                        disabled={previewScale <= 0.3}
                    >
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomIn}
                        disabled={previewScale >= 1}
                    >
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-500 self-center ml-2">
                        {Math.round(previewScale * 100)}%
                    </span>
                </div>

                <div
                    ref={previewContainerRef}
                    className="flex-1 overflow-auto border rounded-lg bg-gray-100 p-4"
                >
                    <div
                        ref={previewContentRef}
                        style={{
                            transform: `scale(${previewScale})`,
                            transformOrigin: 'top center',
                            width: '816px', // A4 width
                            height: '1056px', // A4 height
                            margin: '0 auto',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden'
                        }}
                    >
                        <Templates
                            name={selectedTemplate}
                            data={{
                                ...formData.personal,
                                map_experience: formData.map_experience,
                                map_education: formData.map_education,
                                map_skills: formData.map_skills
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    };


    const renderProgressBar = () => {
        const steps = Object.values(FORM_STEPS);
        const currentIndex = steps.indexOf(currentStep);
        const progress = (currentIndex / (steps.length - 1)) * 100;

        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        );
    };

    const renderStepIndicator = () => {
        const currentStepName = currentStep.toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return (
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {currentStepName}
                </h1>
                <p className="text-sm text-gray-500">
                    Step {Object.values(FORM_STEPS).indexOf(currentStep) + 1} of {Object.values(FORM_STEPS).length}
                </p>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {renderProgressBar()}
            {renderStepIndicator()}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-6">
                    <Card className="p-6">
                        {renderForm()}
                    </Card>
                </div>

                {/* Preview Section - Only show if template is selected */}
                {selectedTemplate && currentStep !== FORM_STEPS.TEMPLATE_SELECT && (
                    <div className="flex sticky top-6 h-[calc(100vh-8rem)] overflow-auto">
                        {renderPreview()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicResumeForm;