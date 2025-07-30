import React, { useState } from 'react';
import { Users, Phone, Mail, MapPin, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Hardskello</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Leading recruitment company in the US, connecting top talent with exceptional opportunities. 
              We specialize in finding the perfect match for both employers and job seekers.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@hardskello.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <a href="/" className="block text-gray-300 hover:text-blue-400 transition-colors">About Us</a>
                <a href="/services" className="block text-gray-300 hover:text-blue-400 transition-colors">Services</a>
                <a href="/staffing-expertises" className="block text-gray-300 hover:text-blue-400 transition-colors">Expertises</a>
              </div>
              <div className="space-y-2">
                <a href="/employee" className="block text-gray-300 hover:text-blue-400 transition-colors">For Job Seekers</a>
                <a href="/employer" className="block text-gray-300 hover:text-blue-400 transition-colors">For Employers</a>
                <a href="/contact" className="block text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Get In Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={3}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center space-x-2 group"
              >
                <Send className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Hardskello. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;