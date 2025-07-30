import React from 'react';
import { Search, Users, Target, Briefcase, CheckCircle, Clock } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Search className="h-12 w-12 text-blue-600" />,
      title: 'Executive Search',
      description: 'Specialized recruitment for C-level executives and senior management positions.',
      features: ['Confidential search process', 'Executive assessment', 'Market intelligence', 'Post-placement support']
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: 'Permanent Placement',
      description: 'Full-time recruitment solutions across all industries and experience levels.',
      features: ['Comprehensive screening', 'Skills assessment', 'Cultural fit evaluation', '90-day guarantee']
    },
    {
      icon: <Target className="h-12 w-12 text-blue-600" />,
      title: 'Contract Staffing',
      description: 'Flexible staffing solutions for project-based and temporary assignments.',
      features: ['Quick turnaround', 'Flexible terms', 'Skilled professionals', 'Ongoing support']
    },
    {
      icon: <Briefcase className="h-12 w-12 text-blue-600" />,
      title: 'Consulting Services',
      description: 'HR consulting and workforce planning to optimize your talent strategy.',
      features: ['Workforce planning', 'Market analysis', 'Salary benchmarking', 'Process optimization']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We work closely with you to understand your specific needs, company culture, and ideal candidate profile.'
    },
    {
      step: '02',
      title: 'Sourcing & Screening',
      description: 'Our expert team uses advanced sourcing techniques to identify and thoroughly screen potential candidates.'
    },
    {
      step: '03',
      title: 'Interview & Assessment',
      description: 'We conduct comprehensive interviews and assessments to ensure candidates meet your requirements.'
    },
    {
      step: '04',
      title: 'Placement & Follow-up',
      description: 'We facilitate the placement process and provide ongoing support to ensure long-term success.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive recruitment solutions tailored to meet your unique hiring needs 
              and career aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From executive search to contract staffing, we provide end-to-end recruitment 
              solutions for businesses of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group flip-card-3d">
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{service.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 group/item hover:translate-x-2 transition-transform duration-300">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 group-hover/item:scale-110 group-hover/item:text-green-600 transition-all duration-300" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures we find the perfect match for both 
              candidates and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6 transition-all duration-500 group-hover:scale-125 group-hover:bg-blue-700 group-hover:shadow-2xl group-hover:rotate-12">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expertise spans across multiple industries, ensuring we understand 
              the unique challenges and requirements of each sector.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Technology', 'Healthcare', 'Finance', 'Manufacturing',
              'Marketing', 'Sales', 'Engineering', 'Human Resources',
              'Operations', 'Legal', 'Consulting', 'Education'
            ].map((industry, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 group cursor-pointer">
                <span className="text-gray-900 font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Clock className="h-12 w-12 text-blue-200 mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let us help you find the perfect talent or your next career opportunity. 
            Contact us today to discuss your requirements.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Contact Us Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;