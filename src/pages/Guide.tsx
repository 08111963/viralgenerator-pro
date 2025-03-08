
import { Navigation } from "@/components/Navigation";
import { GuideHeader } from "@/components/guide/GuideHeader";
import { AppBenefits } from "@/components/guide/AppBenefits";
import { AppSections } from "@/components/guide/AppSections";
import { DetailedGuide } from "@/components/guide/DetailedGuide";

const Guide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-8">
        <GuideHeader />
        <div className="space-y-12">
          <AppBenefits />
          <AppSections />
          <DetailedGuide />
        </div>
      </div>
    </div>
  );
};

export default Guide;
