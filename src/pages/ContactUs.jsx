import React from "react";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-600">
          We're here to help! Reach out to us for any questions or feedback.
        </p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Subject</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter the subject"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows="5"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Send Message
        </button>
      </form>

      {/* Contact Information */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="space-y-2">
          <p className="flex items-center">
            <span className="mr-2">📧</span>
            <span>Email: support@internsystem.com</span>
          </p>
          <p className="flex items-center">
            <span className="mr-2">📞</span>
            <span>Phone: +123 456 7890</span>
          </p>
          <p className="flex items-center">
            <span className="mr-2">🏢</span>
            <span>Address: 123 Medical St, City</span>
          </p>
        </div>
      </div>

      {/* Support Hours */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Support Hours</h2>
        <p className="flex items-center">
          <span className="mr-2">⏰</span>
          <span>Monday - Friday, 9 AM - 5 PM</span>
        </p>
      </div>

      {/* FAQs Link */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">FAQs</h2>
        <p className="flex items-center">
          <span className="mr-2">❓</span>
          <span>
            Visit our{" "}
            <a href="/faqs" className="text-blue-500 underline">
              FAQs
            </a>{" "}
            for quick answers.
          </span>
        </p>
      </div>

      {/* Social Media Links */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Follow Us</h2>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-blue-500">
            Facebook
          </a>
          <a href="https://twitter.com" className="text-blue-500">
            Twitter
          </a>
          <a href="https://linkedin.com" className="text-blue-500">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
