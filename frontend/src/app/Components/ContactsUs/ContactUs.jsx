import React from 'react';
import { useSelector } from 'react-redux';

const ContactUs = () => {
  const isLogged = useSelector((state) => state.userSlice.isLogged);

  return (
    !isLogged && (
      <div
        id="contactUs"
        className="bg-gradient-to-r from-blue-900 to-blue-600 py-16 px-6 text-white"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-200">
            Have any questions? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-10">
          <div className="bg-white text-gray-900 shadow-lg rounded-2xl p-6 w-80">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <p className="text-gray-600 mt-2">Feel free to reach out to us.</p>
            <div className="mt-4 space-y-3">
              <p className="flex items-center gap-2">
                📍 <span>123 Medical Street, Georgia, USA</span>
              </p>
              <p className="flex items-center gap-2">
                📧 <span>contact@medicalcenter.com</span>
              </p>
              <p className="flex items-center gap-2">
                📞 <span>(+1) 123-456-7890</span>
              </p>
            </div>
          </div>

          <div className="bg-white text-gray-900 shadow-lg rounded-2xl p-6 w-96">
            <h3 className="text-xl font-semibold">Send Us a Message</h3>
            <form className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ContactUs;
