
import { useEffect, useState } from 'react';
import { TermsAcceptanceDialog } from '@/components/TermsAcceptanceDialog';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (!termsAccepted) {
      setShowTerms(true);
    }
  }, []);

  const handleCloseTerms = () => {
    setShowTerms(false);
    if (localStorage.getItem('termsAccepted')) {
      navigate(0); // This will refresh the current page
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <TermsAcceptanceDialog 
        isOpen={showTerms} 
        onClose={handleCloseTerms} 
      />
    </>
  );
};

export default Dashboard;
