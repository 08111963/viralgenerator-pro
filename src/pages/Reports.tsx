
import React from "react";
import { Navigation } from "@/components/Navigation";
import { WeeklyReports } from "@/components/dashboard/WeeklyReports";

const Reports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-6">
        <WeeklyReports />
      </main>
    </div>
  );
};

export default Reports;
