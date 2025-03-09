import { useEffect, useState } from 'react';
import { TermsAcceptanceDialog } from '@/components/TermsAcceptanceDialog';

const Dashboard = () => {
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (!termsAccepted) {
      setShowTerms(true);
    }
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <TermsAcceptanceDialog 
        isOpen={showTerms} 
        onClose={() => setShowTerms(false)} 
      />
    </>
  );
};

export default Dashboard;
