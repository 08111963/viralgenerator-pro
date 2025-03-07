
import { Navigation } from "@/components/Navigation";
import { TrendingCard } from "@/components/dashboard/TrendingCard";

// Mock data - in a real app this would come from an API
const mockTrendingHashtags = [
  { id: "1", name: "#AI", volume: 25000, change: 12 },
  { id: "2", name: "#Digital", volume: 18000, change: 5 },
  { id: "3", name: "#Innovation", volume: 15000, change: -2 },
  { id: "4", name: "#Tech", volume: 12000, change: 8 }
];

const mockTrendingKeywords = [
  { id: "1", name: "Intelligenza Artificiale", volume: 35000, change: 15 },
  { id: "2", name: "Machine Learning", volume: 22000, change: 7 },
  { id: "3", name: "Big Data", volume: 18000, change: -3 },
  { id: "4", name: "Cloud Computing", volume: 15000, change: 4 }
];

const mockTrendingTopics = [
  { id: "1", name: "Sostenibilità", volume: 45000, change: 20 },
  { id: "2", name: "Smart Working", volume: 30000, change: 8 },
  { id: "3", name: "Cybersecurity", volume: 25000, change: 12 },
  { id: "4", name: "5G", volume: 20000, change: -5 }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TrendingCard
            title="Hashtag Trending"
            items={mockTrendingHashtags}
            icon="hashtag"
          />
          <TrendingCard
            title="Parole Chiave"
            items={mockTrendingKeywords}
            icon="keyword"
          />
          <TrendingCard
            title="Argomenti Trending"
            items={mockTrendingTopics}
            icon="topic"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
