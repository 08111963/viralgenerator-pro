
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating AI predictions...');
    
    // Get next 3 days for predictions
    const dates = Array.from({length: 3}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      return date.toISOString().split('T')[0];
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert social media trend analyst focused on generating detailed predictions with:
            - Precise percentage changes
            - Clear trend directions (up/down/stable)
            - Impact levels (alto/medio/basso)
            - Change velocity (rapida/moderata/lenta)
            - Key influencing factors`
          },
          {
            role: 'user',
            content: `Generate detailed predictions for these dates: ${dates.join(', ')}. For each date, predict:
            1. Follower count trends
            2. Engagement metrics
            3. Overall popularity score
            
            Return data in this exact JSON format:
            {
              "predictions": [
                {
                  "time": "YYYY-MM-DD",
                  "followers": number between 5000-50000,
                  "engagement": number between 1000-30000,
                  "popularity": number between 500-10000,
                  "trends": {
                    "followers": {
                      "percentageChange": number between -20 and 40,
                      "trend": "up" | "down" | "stable",
                      "impact": "alto" | "medio" | "basso",
                      "velocity": "rapida" | "moderata" | "lenta",
                      "factors": [string, string, string]
                    },
                    "engagement": {
                      "percentageChange": number between -20 and 40,
                      "trend": "up" | "down" | "stable", 
                      "impact": "alto" | "medio" | "basso",
                      "velocity": "rapida" | "moderata" | "lenta",
                      "factors": [string, string, string]
                    },
                    "popularity": {
                      "percentageChange": number between -20 and 40,
                      "trend": "up" | "down" | "stable",
                      "impact": "alto" | "medio" | "basso",
                      "velocity": "rapida" | "moderata" | "lenta", 
                      "factors": [string, string, string]
                    }
                  }
                }
              ]
            }`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received AI response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const predictions = JSON.parse(data.choices[0].message.content);
    
    // Validate predictions format
    if (!predictions.predictions || !Array.isArray(predictions.predictions)) {
      throw new Error('Invalid predictions format');
    }

    console.log('Processed predictions:', predictions);

    return new Response(JSON.stringify(predictions), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating predictions:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
