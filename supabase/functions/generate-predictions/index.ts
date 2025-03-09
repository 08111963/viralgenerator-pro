
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
            content: `Sei un esperto analista di trend social media. Genera previsioni dettagliate includendo:
            - Variazione percentuale rispetto al giorno precedente
            - Tendenza (crescita/decrescita)
            - Impatto previsto
            - Velocità di cambiamento
            - Fattori chiave che influenzano il trend`
          },
          {
            role: 'user',
            content: `Genera previsioni dettagliate per i prossimi 3 giorni in formato JSON con questa struttura:
            {
              "predictions": [
                {
                  "time": "2024-03-XX",
                  "followers": number,
                  "engagement": number,
                  "popularity": number,
                  "trends": {
                    "followers": {
                      "percentageChange": number,
                      "trend": "up" | "down" | "stable",
                      "impact": "alto" | "medio" | "basso",
                      "velocity": "rapida" | "moderata" | "lenta",
                      "factors": string[]
                    },
                    "engagement": { ... stessa struttura ... },
                    "popularity": { ... stessa struttura ... }
                  }
                }
              ]
            }`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received AI predictions:', data);

    const aiPredictions = {
      predictions: JSON.parse(data.choices[0].message.content)
    };

    return new Response(JSON.stringify(aiPredictions), {
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
