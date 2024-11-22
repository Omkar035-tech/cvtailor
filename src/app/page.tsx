


"use client"
import React from 'react';
import { Heart } from 'lucide-react';
import { assets } from '@/assets/assets';
import Midsection from './sections/Midsection';
import ResumeSteps from './sections/Upsection';
import Footer from './sections/Footer';

const MainPage = () => {
  return (
    <div className="min-h-screen">
      <div className="banner flex flex-col lg:flex-row justify-between  px-4 sm:px-6 lg:px-10 relative">
        {/* Banner Left */}
        <div className="banner-left w-full lg:w-[50%] z-10 py-8 lg:py-0">
          <h1 className="text-3xl sm:text-5xl lg:text-[60px] leading-tight lg:leading-[70px] uppercase font-bold relative text-black dark:text-white dark:text-shadow-[0px_0px_2px_#88ffc6]">
            <span className="absolute left-[-20px] lg:left-[-40px] top-1/2 -translate-y-1/2 w-[6px] lg:w-[10px] bg-orange-600 h-full"></span>
            Shape Your <br /> Professional <br /> Journey
          </h1>

          {/* Description */}
          <div className="mt-8 lg:mt-14 max-w-[1000px]">
            <p className="text-sm lg:text-base uppercase text-gray-500 dark:text-gray-400">
              Build your perfect resume effortlessly with our AI-powered resume builder! Designed to cater to professionals across industries, our platform uses cutting-edge AI to craft tailored resumes that highlight your skills, achievements, and career goals. Whether you&apos;re just starting out or aiming for your next big role, our intuitive interface and intelligent recommendations make the process fast, easy, and effective. Start building your dream career today!
            </p>

            {/* Search Form */}
            <form className="mt-8 lg:mt-12">
              <div className="flex flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Search Template names"
                  className="focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-[70%] border border-gray-300 dark:border-gray-600 p-4 uppercase text-black dark:text-white bg-transparent mb-4 sm:mb-0"
                />
                <button
                  type="submit"
                  className="w-full sm:w-[30%] bg-black dark:bg-orange-500 text-white dark:text-white uppercase p-4 hover:bg-gray-800 dark:hover:bg-orange-300"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Banner Right */}
        <div className="banner-right w-full lg:w-[50%] flex flex-col lg:flex-row justify-between lg:pl-[70px] mt-8 lg:mt-0">
          {/* Image Sections Container */}
          <div className="flex lg:flex-row flex-col gap-8 w-full">
            {/* Family Section */}
            <div className="w-full lg:w-[46%] lg:h-[600px] overflow-hidden">
              {/* Wrapper for continuous animation */}
              <div className="lg:animate-scroll-down md:animate-scroll-right flex lg:flex-col md:flex-row flex-col">
                <div className="flex lg:flex-col md:flex-row flex-col">
                  <div className="border border-black dark:border-orange-500 p-4 lg:p-6 relative w-full  mb-5">
                    <Heart size={25} className='inline-flex' />
                    <h2 className="text-3xl lg:text-[52px] font-extrabold mb-4 text-black dark:text-white">42k+</h2>
                    <span className="text-base lg:text-[20px] capitalize text-gray-500 dark:text-orange-500">
                      satisfied <br /> family
                    </span>
                  </div>
                  {[assets.img1, assets.img2, assets.img3, assets.img4].map((item, index) => (
                    <div key={`-${index}`} className=" md:min-w-[300px] md:min-h-[300px]  lg:mb-[45px] md:mr-[45px] lg:mr-0 mb-[45px] last:mb-0 md:last:mr-0 overflow-hidden">
                      <img
                        src={item.src}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sale Section */}
            <div className="w-full lg:w-[46%] lg:h-[600px] overflow-hidden">
              {/* Wrapper for continuous animation */}
              <div className="lg:animate-scroll-up md:animate-scroll-left flex lg:flex-col md:flex-row flex-col">
                <div className="flex lg:flex-col md:flex-row flex-col">
                  {[assets.img5, assets.img6, assets.img7, assets.img8].map((item, index) => (
                    <div key={`${index}`} className="md:min-w-[300px] md:min-h-[300px] lg:mb-[45px] md:mr-[45px] lg:mr-0 mb-[45px] last:mb-0 md:last:mr-0 overflow-hidden">
                      <img
                        src={item.src}
                        alt={`Property ${index + 5}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="border border-black dark:border-orange-500 p-4 lg:p-6 relative w-full ">
                    <Heart size={25} />
                    <h2 className="text-3xl lg:text-[52px] font-extrabold mb-4 text-black dark:text-white">30k+</h2>
                    <span className="text-base lg:text-[20px] capitalize text-gray-500 dark:text-orange-500">
                      Available <br /> Unit for Sale
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResumeSteps />
      <Midsection />
      <Footer />
    </div>
  );
};

export default MainPage;