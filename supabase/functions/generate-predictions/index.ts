
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    
    // Get the next 3 days for predictions
    const dates = Array.from({length: 3}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      return date.toISOString().split('T')[0];
    });

    console.log('Requesting predictions for dates:', dates);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a social media trend analyst. Generate predictions for each date in a JSON format that follows this exact structure:
            {
              "predictions": [
                {
                  "time": "2024-03-12",
                  "followers": 15000,
                  "engagement": 8000,
                  "popularity": 3000,
                  "trends": {
                    "followers": {
                      "percentageChange": 5,
                      "trend": "up",
                      "impact": "alto",
                      "velocity": "rapida",
                      "factors": ["Viral content", "Influencer mentions"]
                    },
                    "engagement": {
                      "percentageChange": 3,
                      "trend": "up",
                      "impact": "medio",
                      "velocity": "moderata",
                      "factors": ["Increased post frequency", "Better content quality"]
                    },
                    "popularity": {
                      "percentageChange": 2,
                      "trend": "stable",
                      "impact": "basso",
                      "velocity": "lenta",
                      "factors": ["Consistent hashtag usage", "Regular posting schedule"]
                    }
                  }
                }
              ]
            }`
          },
          {
            role: 'user',
            content: `Generate predictions for these dates: ${dates.join(', ')}. Follow the exact JSON structure shown, with realistic metrics and specific factors for each trend.`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.statusText}`);
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received AI response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const predictions = JSON.parse(data.choices[0].message.content);

    // Validate predictions structure
    if (!predictions.predictions || !Array.isArray(predictions.predictions)) {
      throw new Error('Invalid predictions format received');
    }

    // Store predictions in Supabase with timestamp
    const { error: insertError } = await supabase
      .from('predictive_trends')
      .insert(predictions.predictions.map((p: any) => ({
        ...p,
        created_at: new Date().toISOString()
      })));

    if (insertError) {
      console.error('Error storing predictions:', insertError);
      throw new Error('Failed to store predictions');
    }

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
