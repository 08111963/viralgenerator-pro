
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import googleTrends from 'npm:google-trends-api';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch real-time trends from multiple regions
    const regions = ['US', 'GB', 'IT', 'FR', 'DE', 'ES', 'JP', 'KR', 'IN', 'BR'];
    const trendPromises = regions.map(geo => 
      googleTrends.realTimeTrends({
        geo: geo,
        category: 'all',
      })
    );

    const results = await Promise.all(trendPromises);
    const processedResults = results.flatMap(result => {
      const data = JSON.parse(result);
      return data.storySummaries.trendingStories.map((story: any) => ({
        title: story.title,
        entityNames: story.entityNames,
        articles: story.articles
      }));
    });

    // Aggregate and deduplicate trends
    const uniqueTrends = Array.from(new Set(
      processedResults.flatMap(result => [
        result.title,
        ...result.entityNames
      ])
    ));

    console.log('Fetched global trends:', uniqueTrends);

    return new Response(JSON.stringify({ trends: uniqueTrends }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching global trends:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
