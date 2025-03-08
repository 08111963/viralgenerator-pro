
import { SocialAccountsManager } from "./SocialAccountsManager";
import ApiKeyDisplay from "./ApiKeyDisplay";

export const FeatureSection = () => {
  return (
    <div className="space-y-6 mt-6">
      <SocialAccountsManager />
      <ApiKeyDisplay />
    </div>
  );
};
