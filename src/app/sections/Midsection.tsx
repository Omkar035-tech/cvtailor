'use client'

import { BrainCog, Wand, FileText } from 'lucide-react'
import React from 'react'

const Midsection = () => {
    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold">
                        DISCOVER WHY CVTAILOR IS THE BEST AI RESUME BUILDER
                    </h2>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg transition-transform duration-300 hover:scale-105">
                        <BrainCog size={48} className="text-orange-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            AI-POWERED PERSONALIZATION
                        </h3>
                        <p className="text-gray-600">
                            Our advanced AI analyzes your skills and experience to craft a resume tailored
                            specifically for the job you want, ensuring you stand out to recruiters.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg transition-transform duration-300 hover:scale-105">
                        <Wand size={48} className="text-orange-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            ONE-CLICK RESUME CREATION
                        </h3>
                        <p className="text-gray-600">
                            Create a stunning resume effortlessly. Just provide your details, and let our
                            AI handle formatting, structure, and content optimization.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg transition-transform duration-300 hover:scale-105">
                        <FileText size={48} className="text-orange-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            ACCESS TO PREMIUM TEMPLATES
                        </h3>
                        <p className="text-gray-600">
                            Choose from a variety of industry-standard templates designed to highlight
                            your strengths and make a lasting impression.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Midsection
