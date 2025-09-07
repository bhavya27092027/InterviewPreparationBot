import React from 'react';
import { RoleSelector } from './components/RoleSelector';
import { InterviewModeSelector } from './components/InterviewModeSelector';
import { InterviewChat } from './components/InterviewChat';
import { InterviewSummary } from './components/InterviewSummary';

type AppState = 'role-selection' | 'mode-selection' | 'interview' | 'summary';

interface Message {
  id: string;
  type: 'question' | 'answer' | 'feedback';
  content: string;
  score?: number;
  timestamp: Date;
}

function App() {
  const [currentState, setCurrentState] = React.useState<AppState>('role-selection');
  const [selectedRole, setSelectedRole] = React.useState<string>('');
  const [selectedDomain, setSelectedDomain] = React.useState<string>('');
  const [selectedMode, setSelectedMode] = React.useState<'technical' | 'behavioral'>('technical');
  const [interviewMessages, setInterviewMessages] = React.useState<Message[]>([]);
  const [finalScore, setFinalScore] = React.useState<number>(0);

  const handleRoleSelect = (role: string, domain: string) => {
    setSelectedRole(role);
    setSelectedDomain(domain);
    setCurrentState('mode-selection');
  };

  const handleModeSelect = (mode: 'technical' | 'behavioral') => {
    setSelectedMode(mode);
    setCurrentState('interview');
  };

  const handleInterviewComplete = (messages: Message[], score: number) => {
    setInterviewMessages(messages);
    setFinalScore(score);
    setCurrentState('summary');
  };

  const handleNewInterview = () => {
    setCurrentState('role-selection');
    setSelectedRole('');
    setSelectedDomain('');
    setInterviewMessages([]);
    setFinalScore(0);
  };

  const handleBackToRoleSelection = () => {
    setCurrentState('role-selection');
  };

  const handleBackToModeSelection = () => {
    setCurrentState('mode-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {currentState === 'role-selection' && (
        <RoleSelector onRoleSelect={handleRoleSelect} />
      )}
      
      {currentState === 'mode-selection' && (
        <InterviewModeSelector
          role={selectedRole}
          domain={selectedDomain}
          onModeSelect={handleModeSelect}
          onBack={handleBackToRoleSelection}
        />
      )}
      
      {currentState === 'interview' && (
        <InterviewChat
          role={selectedRole}
          domain={selectedDomain}
          mode={selectedMode}
          onBack={handleBackToModeSelection}
          onComplete={handleInterviewComplete}
        />
      )}
      
      {currentState === 'summary' && (
        <InterviewSummary
          role={selectedRole}
          domain={selectedDomain}
          mode={selectedMode}
          messages={interviewMessages}
          finalScore={finalScore}
          onNewInterview={handleNewInterview}
        />
      )}
    </div>
  );
}

export default App;