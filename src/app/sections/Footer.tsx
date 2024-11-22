import { assets } from '@/assets/assets';
import { Instagram, Linkedin, Locate, Mail, Phone, Plane, Twitter } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto px-4 py-8">
                {/* Call to Action Section */}
                <div className="border-b border-gray-700 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start space-x-4">
                            <Locate size={20} />
                            <div>
                                <h4 className="text-white text-lg font-semibold mb-1">Find us</h4>
                                <p>1010 Avenue, SW 54321, Chandigarh</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Phone size={20} />
                            <div>
                                <h4 className="text-white text-lg font-semibold mb-1">Call us</h4>
                                <p>9876543210 0</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Mail size={20} />
                            <div>
                                <h4 className="text-white text-lg font-semibold mb-1">Mail us</h4>
                                <p>mail@info.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
                    {/* Logo & About Section */}
                    <div>
                        <Image
                            src={assets.logoimg}
                            alt="logo"
                            width={100}
                            height={300}
                            className="mb-4 w-40"
                        />
                        <p className="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div>
                            <span className="text-white font-semibold text-lg">Follow us</span>
                            <div className="flex space-x-4 mt-4">
                                <a
                                    href="#"
                                    className="bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-600"
                                >
                                    <Linkedin />
                                </a>
                                <a
                                    href="#"
                                    className="bg-blue-400 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-300"
                                >
                                    <Twitter />
                                </a>
                                <a
                                    href="#"
                                    className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-400"
                                >
                                    <Instagram />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Useful Links Section */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-4">Useful Links</h3>
                        <ul className="grid grid-cols-2 gap-2">
                            {[
                                'Home',
                                'About',
                                'Services',
                                'Portfolio',
                                'Contact',
                                'About us',
                                'Our Services',
                                'Expert Team',
                                'Contact us',
                                'Latest News',
                            ].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="hover:text-orange-500 transition-colors duration-200"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subscribe Section */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-4">Subscribe</h3>
                        <p className="mb-4">
                            Don't miss to subscribe to our new feeds, kindly fill the form
                            below.
                        </p>
                        <form className="relative">
                            <input
                                type="text"
                                placeholder="Email Address"
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-l-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-r-md hover:bg-orange-400"
                            >
                                <Plane size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="bg-gray-800 py-4">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        &copy; 2023, All Right Reserved{' '}
                        <a
                            href="https://codepen.io/anupkumar92/"
                            className="text-orange-500 hover:underline"
                        >
                            CVTailor
                        </a>
                    </p>
                    <ul className="flex space-x-4 mt-4 lg:mt-0">
                        {['Home', 'Terms', 'Privacy', 'Policy', 'Contact'].map((item, idx) => (
                            <li key={idx}>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-orange-500 transition-colors duration-200 text-sm"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
