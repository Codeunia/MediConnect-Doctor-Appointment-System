// src/pages/Contact.jsx
import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-green-50 px-6 py-12 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-green-100">
        <h1 className="text-4xl font-extrabold text-green-700 mb-6 text-center">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Have a question, feedback, or need help? Fill out the form and we’ll get back to you within 24 hours.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-green-800">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-green-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-semibold text-green-800">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Your message here..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all w-full text-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
