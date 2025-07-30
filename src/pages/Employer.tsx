import React from 'react';
import { Users, Target, Clock, Shield, CheckCircle, TrendingUp, Award, Zap } from 'lucide-react';

const Employer: React.FC = () => {
  const services = [
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: 'Permanent Recruitment',
      description: 'Find full-time employees who will become valuable long-term assets to your organization.',
      features: ['Comprehensive screening', 'Cultural fit assessment', '90-day replacement guarantee', 'Post-placement support']
    },
    {
      icon: <Clock className="h-12 w-12 text-green-600" />,
      title: 'Contract Staffing',
      description: 'Flexible staffing solutions for temporary projects and seasonal demands.',
      features: ['Quick turnaround', 'Vetted professionals', 'Flexible terms', 'Administrative support']
    },
    {
      icon: <Target className="h-12 w-12 text-purple-600" />,
      title: 'Executive Search',
      description: 'Specialized recruitment for senior-level and C-suite positions.',
      features: ['Confidential process', 'Executive assessment', 'Market intelligence', 'Leadership evaluation']
    },
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: 'RPO Services',
      description: 'Recruitment Process Outsourcing for scalable hiring solutions.',
      features: ['Dedicated team', 'Process optimization', 'Technology integration', 'Scalable solutions']
    }
  ];

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Faster Hiring',
      description: 'Average time-to-hire of just 25 days vs. industry average of 45 days.',
      stat: '44% faster'
    },
    {
      icon: <Award className="h-8 w-8 text-blue-500" />,
      title: 'Quality Candidates',
      description: 'Rigorous screening ensures only top-tier candidates reach your desk.',
      stat: '98% pass rate'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: 'Higher Retention',
      description: 'Our placements have a 92% retention rate after 12 months.',
      stat: '92% retention'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: 'Extensive Network',
      description: 'Access to our database of 50,000+ qualified professionals.',
      stat: '50K+ candidates'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation & Strategy',
      description: 'We start by understanding your company culture, role requirements, and hiring goals to develop a targeted recruitment strategy.'
    },
    {
      step: '02',
      title: 'Sourcing & Screening',
      description: 'Our team leverages multiple channels to identify qualified candidates and conducts thorough initial screenings.'
    },
    {
      step: '03',
      title: 'Candidate Presentation',
      description: 'We present you with a curated shortlist of the most qualified candidates, complete with detailed profiles.'
    },
    {
      step: '04',
      title: 'Interview Coordination',
      description: 'We manage the entire interview process, coordinate schedules, and provide feedback between all parties.'
    },
    {
      step: '05',
      title: 'Offer & Onboarding',
      description: 'We assist with offer negotiations and provide support during the onboarding process to ensure success.'
    }
  ];

  const testimonials = [
    {
      company: 'TechCorp Inc.',
      representative: 'Sarah Johnson, HR Director',
      quote: 'Hardskello helped us build our entire engineering team. Their understanding of our culture and technical requirements was exceptional.',
      logo: '🏢'
    },
    {
      company: 'FinanceFirst',
      representative: 'Michael Chen, CEO',
      quote: 'The quality of candidates and speed of delivery exceeded our expectations. We now consider them our strategic hiring partner.',
      logo: '💼'
    },
    {
      company: 'HealthTech Solutions',
      representative: 'Dr. Emily Rodriguez, VP of Operations',
      quote: 'Their expertise in healthcare recruitment is unmatched. They found us specialized talent we couldn\'t find elsewhere.',
      logo: '🏥'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Top Talent Fast
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Partner with Hardskello to access the best talent in the market. 
              Our proven recruitment process delivers quality candidates quickly and efficiently.
            </p>
            <div className="space-x-4">
              <a
                href="/employer-login"
                className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
              >
                Employer Login
              </a>
              <a
                href="#services"
                className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {benefit.stat}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </div>
                <div className="text-gray-600 text-sm">
                  {benefit.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recruitment Services for Employers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions tailored to meet your unique hiring needs, 
              from individual placements to large-scale recruitment projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group flip-card-employer">
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
              Our Recruitment Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic, proven approach that ensures we find the right candidates 
              for your organization quickly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6 transition-all duration-500 group-hover:scale-125 group-hover:bg-blue-700 group-hover:shadow-2xl group-hover:rotate-12">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Leading Companies Choose Hardskello
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Expertise</h3>
                    <p className="text-gray-600">Our recruiters specialize in specific industries and understand the nuances of each sector.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Track Record</h3>
                    <p className="text-gray-600">15+ years of successful placements with a 98% client satisfaction rate.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Technology-Driven</h3>
                    <p className="text-gray-600">Advanced sourcing tools and AI-powered matching ensure we find the best candidates.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Communication</h3>
                    <p className="text-gray-600">Regular updates, clear timelines, and honest feedback throughout the process.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Business meeting"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from companies that have successfully partnered with us to build their teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{testimonial.logo}</div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.company}</p>
                  <p className="text-sm text-gray-500">{testimonial.representative}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No hidden fees. Pay only when we successfully place a candidate.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Success-Based Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">15-20%</div>
                <div className="text-gray-700">Standard Positions</div>
                <div className="text-sm text-gray-500">Annual salary-based fee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">20-25%</div>
                <div className="text-gray-700">Senior Positions</div>
                <div className="text-sm text-gray-500">Annual salary-based fee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">25-33%</div>
                <div className="text-gray-700">Executive Search</div>
                <div className="text-sm text-gray-500">Annual salary-based fee</div>
              </div>
            </div>
            <p className="text-gray-600">
              All placements include a 90-day replacement guarantee at no additional cost.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Dream Team?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your hiring needs and show you how we can help you find 
            the perfect candidates for your organization.
          </p>
          <div className="space-x-4">
            <a
              href="/employer-login"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
            >
              Employer Login
            </a>
            <a
              href="/services"
              className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employer;