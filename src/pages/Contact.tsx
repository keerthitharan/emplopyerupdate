import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you within 24 hours.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: 'Office Address',
      details: ['123 Business Avenue', 'New York, NY 10001', 'United States']
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: 'Phone Numbers',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568', 'Toll Free: 1-800-HARDSKELLO']
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: 'Email Addresses',
      details: ['info@hardskello.com', 'careers@hardskello.com', 'support@hardskello.com']
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', 'Sunday: Closed']
    }
  ];

  const offices = [
    {
      city: 'New York',
      address: '123 Business Avenue, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'newyork@hardskello.com'
    },
    {
      city: 'Los Angeles',
      address: '456 Corporate Blvd, Los Angeles, CA 90210',
      phone: '+1 (555) 987-6543',
      email: 'losangeles@hardskello.com'
    },
    {
      city: 'Chicago',
      address: '789 Professional Street, Chicago, IL 60601',
      phone: '+1 (555) 456-7890',
      email: 'chicago@hardskello.com'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to take the next step? Get in touch with our team of recruitment experts. 
              We're here to help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="job-seeker">Job Seeker</option>
                      <option value="employer">Employer/Hiring</option>
                      <option value="partnership">Partnership</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center space-x-2 group"
                >
                  <Send className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 hover:text-blue-600 transition-colors duration-300">
                  Get In Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  We're here to help you with any questions or concerns. Reach out to us 
                  using any of the methods below, and we'll respond promptly.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
                    <div className="flex-shrink-0 mt-1 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-blue-600 hover:scale-110 hover:rotate-12 transition-all duration-300" />
                  <h3 className="font-semibold text-gray-900">Quick Response</h3>
                </div>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
              Our Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With offices across the United States, we're positioned to serve clients 
              and candidates nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {office.city}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 group/item hover:translate-x-1 transition-transform duration-300">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 group-hover/item:text-blue-700 transition-all duration-300" />
                    <p className="text-gray-600">{office.address}</p>
                  </div>
                  <div className="flex items-center space-x-3 group/item hover:translate-x-1 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 group-hover/item:scale-110 group-hover/item:text-blue-700 transition-all duration-300" />
                    <p className="text-gray-600">{office.phone}</p>
                  </div>
                  <div className="flex items-center space-x-3 group/item hover:translate-x-1 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 group-hover/item:scale-110 group-hover/item:text-blue-700 transition-all duration-300" />
                    <p className="text-gray-600">{office.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Us on the Map
            </h2>
            <p className="text-gray-600">
              Visit our main office in New York or connect with us virtually.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Interactive Map Coming Soon</p>
              <p className="text-gray-400">123 Business Avenue, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;