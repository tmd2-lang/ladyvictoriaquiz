import React from 'react';
import StandaloneQuiz from './components/StandaloneQuiz';

function App() {
  const handleBackToSite = () => {
    window.location.href = 'https://lady-victoria-investment-guide.vercel.app';
  };

  return (
    <div className="w-full min-h-screen">
      <StandaloneQuiz onBack={handleBackToSite} />
    </div>
  );
}

export default App;
