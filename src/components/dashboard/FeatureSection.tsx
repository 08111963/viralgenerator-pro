
import React from 'react';
import { SocialAccountsManager } from "./SocialAccountsManager";
import ApiKeyDisplay from "./ApiKeyDisplay";

export const FeatureSection = () => {
  console.log("FeatureSection rendering");
  return (
    <div className="space-y-6 mt-6">
      <SocialAccountsManager />
      <ApiKeyDisplay />
    </div>
  );
};
