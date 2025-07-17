import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-[#1D267D] mb-6">About MediConnect</h2>
      <p className="max-w-3xl text-center text-gray-700 text-lg leading-relaxed">
        MediConnect is a modern, user-friendly doctor appointment booking platform designed to simplify healthcare access. 
        Whether you're looking to consult a general physician, a specialist, or get your regular check-ups done, 
        MediConnect ensures that your healthcare is just a few clicks away.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl">
        <div className="bg-[#EEF5FF] p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-[#1D267D] mb-2">Our Mission</h3>
          <p className="text-gray-700">
            To bridge the gap between patients and doctors by offering a seamless online appointment experience that prioritizes ease, trust, and accessibility.
          </p>
        </div>
        <div className="bg-[#C6DCBA] p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-[#1D267D] mb-2">Why Choose Us</h3>
          <p className="text-gray-700">
            We provide verified doctor listings, instant booking confirmations, easy rescheduling, and reminders — all wrapped in a clean and fast interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
