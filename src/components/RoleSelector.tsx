import React from 'react';
import { User, Code, BarChart3, Briefcase, Brain, Database } from 'lucide-react';

interface Role {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  domains: string[];
}

interface RoleSelectorProps {
  onRoleSelect: (role: string, domain: string) => void;
}

const roles: Role[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    icon: Code,
    domains: ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps']
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    icon: Briefcase,
    domains: ['Consumer Products', 'B2B SaaS', 'Mobile Apps', 'Platform', 'Growth']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    icon: BarChart3,
    domains: ['Business Intelligence', 'Marketing Analytics', 'Financial Analysis', 'Operations', 'Product Analytics']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: Brain,
    domains: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Recommendation Systems']
  },
  {
    id: 'system-designer',
    title: 'System Designer',
    icon: Database,
    domains: ['Distributed Systems', 'Microservices', 'Scalability', 'Cloud Architecture', 'Database Design']
  }
];

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [selectedDomain, setSelectedDomain] = React.useState<string>('');

  const handleContinue = () => {
    if (selectedRole && selectedDomain) {
      onRoleSelect(selectedRole.id, selectedDomain);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Target Role</h1>
        <p className="text-gray-600">Select the position and domain you want to practice interviewing for</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
                selectedRole?.id === role.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-3 ${
                selectedRole?.id === role.id ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <h3 className="font-semibold text-gray-900">{role.title}</h3>
            </button>
          );
        })}
      </div>

      {selectedRole && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Domain for {selectedRole.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedRole.domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`p-3 rounded-md border transition-all ${
                  selectedDomain === domain
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedRole && selectedDomain && (
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue to Interview Mode
          </button>
        </div>
      )}
    </div>
  );
}