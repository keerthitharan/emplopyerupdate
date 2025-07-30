import React from 'react';
import { Users, Target, Award, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const stats = [
    { number: '5000+', label: 'Successful Placements' },
    { number: '500+', label: 'Partner Companies' },
    { number: '15+', label: 'Years of Experience' },
    { number: '98%', label: 'Client Satisfaction' },
  ];

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Expert Recruitment Team',
      description: 'Our experienced recruiters understand industry needs and match the right talent with the right opportunities.',
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'Targeted Approach',
      description: 'We use data-driven strategies to identify and attract top-tier candidates for your specific requirements.',
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: 'Quality Assurance',
      description: 'Rigorous screening processes ensure we deliver only the most qualified candidates to our clients.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: 'Career Growth',
      description: 'We focus on long-term career development and sustainable professional relationships.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Connecting Talent with
              <span className="text-blue-300 inline-block transform hover:scale-105 transition-transform duration-300"> Opportunity</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
              Leading recruitment company in the US, specializing in finding the perfect match 
              between exceptional talent and outstanding career opportunities.
            </p>
            <div className="space-x-4 animate-fade-in-up animation-delay-600">
              <a
                href="/employee"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
              >
                Find Your Dream Job
              </a>
              <a
                href="/employer"
                className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
              >
                Hire Top Talent
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-700">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium transition-all duration-300 group-hover:text-gray-800">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
              About Hardskello
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With over 15 years of experience in the recruitment industry, we've built our reputation 
              on delivering exceptional results for both job seekers and employers across the United States.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At Hardskello, we believe that the right career opportunity can transform lives, 
                and the right talent can drive business success. Our mission is to bridge the gap 
                between exceptional professionals and forward-thinking companies.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We take pride in our personalized approach, taking the time to understand the unique 
                needs of each client and candidate. This attention to detail has resulted in thousands 
                of successful placements and long-lasting professional relationships.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-700"></div>
                  <span className="text-gray-700">Personalized recruitment solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-700"></div>
                  <span className="text-gray-700">Industry expertise across multiple sectors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-700"></div>
                  <span className="text-gray-700">Commitment to long-term success</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional team meeting"
                className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
              Why Choose Hardskello?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine industry expertise with innovative recruitment strategies to deliver 
              exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group flip-card">
                <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking for your next career opportunity or seeking top talent 
            for your organization, we're here to help you succeed.
          </p>
          <div className="space-x-4">
            <a
              href="/contact"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
            >
              Contact Us Today
            </a>
            <a
              href="/services"
              className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;