
import React from "react";
import { Navigation } from "@/components/Navigation";
import ApiKeyDisplay from "@/components/dashboard/ApiKeyDisplay";
import { ContentGenerator } from "@/components/dashboard/ContentGenerator";
import { ContentOptimizer } from "@/components/dashboard/ContentOptimizer";
import { PremiumFeatureOverlay } from "@/components/dashboard/PremiumFeatureOverlay";
import { ShareSection } from "@/components/ShareSection";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-6">
        <div className="mb-6">
          <ApiKeyDisplay />
        </div>

        <div className="mb-6">
          <PremiumFeatureOverlay>
            <ContentGenerator />
          </PremiumFeatureOverlay>
        </div>

        <div className="mb-6">
          <PremiumFeatureOverlay>
            <ContentOptimizer />
          </PremiumFeatureOverlay>
        </div>
        
        <div className="mb-6">
          <ShareSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
