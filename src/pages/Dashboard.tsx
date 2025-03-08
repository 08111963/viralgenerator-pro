import React from "react";
import { Navigation } from "@/components/Navigation";
import { TrendAnalytics } from "@/components/dashboard/TrendAnalytics";
import { SocialAccountsManager } from "@/components/dashboard/SocialAccountsManager";
import { ContentGenerator } from "@/components/dashboard/ContentGenerator";
import { ShareSection } from "@/components/ShareSection";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-6">
        <div className="grid gap-6">
          <TrendAnalytics />
          <SocialAccountsManager />
          <ContentGenerator />
          <ShareSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
