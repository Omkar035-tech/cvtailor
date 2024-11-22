import { assets } from "@/assets/assets";
import React from "react";

const Card = ({ image, heading, description, reverse }) => (
    <div
        className={`flex flex-col lg:flex-row ${reverse ? "lg:flex-row-reverse" : ""
            } items-center bg-orange-500 lg:justify-between gap-6 lg:gap-12 py-6 shadow-lg rounded-lg overflow-hidden border my-6`}
    >
        <div className=" w-full lg:w-1/2 flex justify-center items-center">
            <img
                src={image}
                alt={heading}
                className="w-auto h-64 object-center "
            />
        </div>
        <div className="lg:w-1/2 px-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">{heading}</h2>
            <ul className="list-disc list-inside space-y-2 ">
                {description.map((desc: string, index: number) => (
                    <li key={index}>{desc}</li>
                ))}
            </ul>
        </div>
    </div>
);

const ResumeSteps = () => {
    const steps = [
        {
            image: assets.step1.src,
            heading: "Step 1: Choose a Template",
            description: [
                "Browse a wide variety of professional templates.",
                "Select one that suits your industry and style.",
                "Easy-to-use interface for customization.",
            ],
            reverse: false,
        },
        {
            image: assets.step2.src,
            heading: "Step 2: Enter Your Details",
            description: [
                "Fill in your personal and professional information.",
                "Add your skills, education, and experience.",
                "Use AI suggestions to refine your entries.",
            ],
            reverse: true,
        },
        {
            image: assets.step3.src,
            heading: "Step 3: Review and Finalize",
            description: [
                "Check for errors or incomplete sections.",
                "Preview your resume before downloading.",
                "Ensure it aligns with your career goals.",
            ],
            reverse: false,
        },
    ];

    return (
        <div className="lg:mx-36 px-4 lg:px-0 py-8 mx-auto">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-center mb-8">
                Create Your Resume in 3 Simple Steps
            </h1>
            {steps.map((step, index) => (
                <Card
                    key={index}
                    image={step.image}
                    heading={step.heading}
                    description={step.description}
                    reverse={step.reverse}
                />
            ))}
            <div className="text-center mt-12">
                <button
                    onClick={() => (window.location.href = "/login")}
                    className="bg-orange-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition"
                >
                    Download Your Resume
                </button>
            </div>
        </div>
    );
};

export default ResumeSteps;
