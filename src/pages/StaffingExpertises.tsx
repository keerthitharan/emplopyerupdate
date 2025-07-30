import React from 'react';
import { Code, Heart, DollarSign, Cog, TrendingUp, Users, Shield, BookOpen } from 'lucide-react';

const StaffingExpertises: React.FC = () => {
  const expertises = [
    {
      icon: <Code className="h-12 w-12 text-blue-600" />,
      title: 'Technology & IT',
      description: 'Software engineers, data scientists, cybersecurity experts, and IT specialists.',
      skills: ['Software Development', 'Data Science', 'Cloud Computing', 'Cybersecurity', 'DevOps', 'AI/ML'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: <Heart className="h-12 w-12 text-red-600" />,
      title: 'Healthcare & Life Sciences',
      description: 'Medical professionals, researchers, and healthcare administration experts.',
      skills: ['Nursing', 'Medical Research', 'Healthcare Admin', 'Pharmaceuticals', 'Biotech', 'Medical Devices'],
      color: 'bg-red-50 border-red-200'
    },
    {
      icon: <DollarSign className="h-12 w-12 text-green-600" />,
      title: 'Finance & Banking',
      description: 'Financial analysts, investment professionals, and banking specialists.',
      skills: ['Investment Banking', 'Risk Management', 'Financial Analysis', 'Compliance', 'Accounting', 'Fintech'],
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: <Cog className="h-12 w-12 text-gray-600" />,
      title: 'Engineering & Manufacturing',
      description: 'Mechanical, electrical, and industrial engineers across various industries.',
      skills: ['Mechanical Engineering', 'Electrical Engineering', 'Quality Control', 'Process Improvement', 'Automation', 'Lean Manufacturing'],
      color: 'bg-gray-50 border-gray-200'
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-purple-600" />,
      title: 'Sales & Marketing',
      description: 'Sales professionals, marketing specialists, and business development experts.',
      skills: ['Business Development', 'Digital Marketing', 'Sales Management', 'Brand Strategy', 'Customer Success', 'Market Research'],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      icon: <Users className="h-12 w-12 text-indigo-600" />,
      title: 'Human Resources',
      description: 'HR generalists, talent acquisition specialists, and organizational development professionals.',
      skills: ['Talent Acquisition', 'Employee Relations', 'Compensation & Benefits', 'HR Analytics', 'Learning & Development', 'HR Technology'],
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      icon: <Shield className="h-12 w-12 text-orange-600" />,
      title: 'Legal & Compliance',
      description: 'Corporate lawyers, compliance officers, and legal support professionals.',
      skills: ['Corporate Law', 'Regulatory Compliance', 'Contract Management', 'Intellectual Property', 'Employment Law', 'Legal Operations'],
      color: 'bg-orange-50 border-orange-200'
    },
    {
      icon: <BookOpen className="h-12 w-12 text-teal-600" />,
      title: 'Consulting & Strategy',
      description: 'Management consultants, strategy professionals, and business analysts.',
      skills: ['Management Consulting', 'Strategy Development', 'Business Analysis', 'Change Management', 'Process Optimization', 'Digital Transformation'],
      color: 'bg-teal-50 border-teal-200'
    }
  ];

  const levels = [
    {
      title: 'Entry Level',
      description: 'Recent graduates and professionals with 0-2 years of experience',
      roles: ['Junior Developers', 'Associate Analysts', 'Sales Associates', 'HR Coordinators']
    },
    {
      title: 'Mid-Level',
      description: 'Experienced professionals with 3-8 years in their field',
      roles: ['Senior Analysts', 'Project Managers', 'Team Leads', 'Specialists']
    },
    {
      title: 'Senior Level',
      description: 'Industry veterans with 8+ years of experience and leadership skills',
      roles: ['Directors', 'Senior Managers', 'Principal Engineers', 'Practice Leads']
    },
    {
      title: 'Executive Level',
      description: 'C-suite executives and senior leadership positions',
      roles: ['CEOs', 'CTOs', 'VPs', 'Department Heads']
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Staffing Expertises
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Specialized recruitment across multiple industries and experience levels, 
              connecting the right talent with the right opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Areas of Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in recruiting top talent across diverse industries, 
              leveraging deep domain knowledge and extensive networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertises.map((expertise, index) => (
              <div key={index} className={`border-2 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group flip-card-expertise ${expertise.color}`}>
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{expertise.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {expertise.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {expertise.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {expertise.skills.map((skill, idx) => (
                      <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-blue-50 hover:border-blue-200 cursor-pointer">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
              Experience Levels We Recruit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From entry-level positions to C-suite executives, we have the expertise 
              to find the right candidates at every career stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {levels.map((level, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-all duration-500 group-hover:scale-125 group-hover:bg-blue-700 group-hover:shadow-2xl group-hover:rotate-12">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {level.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-center mb-4 text-sm group-hover:text-gray-800 transition-colors duration-300">
                  {level.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm">Example Roles:</h4>
                  <ul className="space-y-1">
                    {level.roles.map((role, idx) => (
                      <li key={idx} className="text-sm text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                        • {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Track Record
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that speak to our expertise and commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Successful Placements</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">25</div>
              <div className="text-gray-600">Average Days to Hire</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
              <div className="text-gray-600">Retention Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Specialized Talent?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our industry expertise and extensive networks enable us to find the right 
            candidates for even the most specialized roles.
          </p>
          <div className="space-x-4">
            <a
              href="/contact"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Discuss Your Needs
            </a>
            <a
              href="/employer"
              className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              For Employers
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StaffingExpertises;