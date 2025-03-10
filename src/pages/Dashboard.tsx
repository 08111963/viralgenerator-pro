
import React from "react";
import { Navigation } from "@/components/Navigation";
import ApiKeyDisplay from "@/components/dashboard/ApiKeyDisplay";
import { ContentGenerator } from "@/components/dashboard/ContentGenerator";
import { ContentOptimizer } from "@/components/dashboard/ContentOptimizer";
import { ShareSection } from "@/components/ShareSection";
import { useAuth } from "@/lib/auth";

const Dashboard = () => {
  const { session } = useAuth();

  if (!session) {
    return null; // The ProtectedRoute will handle the redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-6">
        <div className="mb-6">
          <ApiKeyDisplay />
        </div>

        <div className="mb-6">
          <ContentGenerator />
        </div>

        <div className="mb-6">
          <ContentOptimizer />
        </div>
        
        <div className="mb-6">
          <ShareSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
