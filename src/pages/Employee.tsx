import React from 'react';
import { Search, FileText, UserCheck, Briefcase, Star, TrendingUp, Award, Users } from 'lucide-react';

const Employee: React.FC = () => {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-blue-600" />,
      title: 'Browse Opportunities',
      description: 'Explore our extensive database of job openings across various industries and experience levels.'
    },
    {
      icon: <FileText className="h-12 w-12 text-blue-600" />,
      title: 'Submit Your Profile',
      description: 'Upload your resume and complete your professional profile to get matched with relevant positions.'
    },
    {
      icon: <UserCheck className="h-12 w-12 text-blue-600" />,
      title: 'Get Matched',
      description: 'Our expert recruiters will match you with opportunities that align with your skills and career goals.'
    },
    {
      icon: <Briefcase className="h-12 w-12 text-blue-600" />,
      title: 'Land Your Dream Job',
      description: 'We provide support throughout the interview process and help you secure the perfect position.'
    }
  ];

  const benefits = [
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: 'Access to Hidden Jobs',
      description: 'Get exclusive access to positions that are not advertised publicly.'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: 'Career Advancement',
      description: 'Find opportunities that align with your career growth objectives.'
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: 'Expert Guidance',
      description: 'Receive personalized career advice from experienced recruiters.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: 'Network Building',
      description: 'Connect with industry professionals and expand your network.'
    }
  ];

  const jobCategories = [
    { name: 'Technology', count: '1,200+ jobs' },
    { name: 'Healthcare', count: '850+ jobs' },
    { name: 'Finance', count: '680+ jobs' },
    { name: 'Engineering', count: '720+ jobs' },
    { name: 'Sales & Marketing', count: '950+ jobs' },
    { name: 'Human Resources', count: '420+ jobs' },
    { name: 'Operations', count: '580+ jobs' },
    { name: 'Legal', count: '320+ jobs' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at TechCorp',
      quote: 'Hardskello helped me find my dream job in just 3 weeks. Their team understood exactly what I was looking for.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director at InnovateCo',
      quote: 'The personalized approach and expert guidance made all the difference in my job search. Highly recommended!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Financial Analyst at FinanceFirst',
      quote: 'Professional, efficient, and results-driven. They matched me with a position that exceeded my expectations.',
      rating: 5
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Career
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Connect with top employers and discover opportunities that match your skills, 
              experience, and career aspirations.
            </p>
            <div className="space-x-4">
              <a
                href="/contact"
                className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Start Your Job Search
              </a>
              <a
                href="#how-it-works"
                className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Learn How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Job Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover thousands of job openings across various industries and experience levels.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-blue-600 font-medium">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes it easy to find and secure your next career opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide more than just job placement – we're your career development partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group flip-card-benefit">
                <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who found their dream careers through Hardskello.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group testimonial-card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current transition-all duration-300 group-hover:scale-110 group-hover:text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Resources */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Career Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Free resources to help you succeed in your job search and career development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume Writing Tips</h3>
              <p className="text-gray-600 mb-6">
                Expert advice on creating compelling resumes that get noticed by employers.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Read More →
              </a>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Interview Preparation</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive guide to preparing for interviews and making a great impression.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Learn More →
              </a>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Salary Negotiation</h3>
              <p className="text-gray-600 mb-6">
                Strategies for negotiating competitive compensation packages.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Explore →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream careers through Hardskello. 
            Let us help you take the next step in your career journey.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default Employee;