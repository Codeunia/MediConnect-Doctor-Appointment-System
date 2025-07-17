import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#EEF5FF] flex flex-col items-center justify-center px-6 py-12">
      <h2 className="text-4xl font-bold text-[#1D267D] mb-6">Contact Us</h2>
      <p className="text-gray-700 text-lg text-center max-w-2xl mb-8">
        Have a question or need assistance? Reach out to our support team and we'll get back to you as soon as possible.
      </p>

      <form className="w-full max-w-xl bg-white p-8 rounded-xl shadow-md space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D267D]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D267D]"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            placeholder="How can we help you?"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D267D]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#0C134F] text-white px-6 py-2 rounded-full hover:bg-[#1D267D] transition duration-300 font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
