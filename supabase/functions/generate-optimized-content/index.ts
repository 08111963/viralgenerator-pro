
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_shared/supabase.ts";

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
    const { content, trends, template, platform } = await req.json();

    // Formatta i trend in un formato leggibile
    const trendsSummary = trends.map((t: any) => 
      `${t.name} (volume: ${t.volume}, crescita: ${t.change}%)`
    ).join('\n');

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
            content: `Sei un esperto di social media marketing per ${platform}. 
                     Ottimizza i contenuti per massimizzare l'engagement utilizzando i trend attuali.
                     Usa emoji appropriate e hashtag rilevanti.
                     Rispetta sempre il template fornito se presente.`
          },
          { 
            role: 'user', 
            content: `Genera una versione ottimizzata del seguente contenuto:
                     "${content}"
                     
                     Trend attuali da considerare:
                     ${trendsSummary}
                     
                     ${template ? `Usa questo template: ${template}` : ''}
                     
                     Piattaforma target: ${platform}`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Errore nella chiamata a OpenAI');
    }

    const data = await response.json();
    return new Response(JSON.stringify({
      optimizedContent: data.choices[0].message.content,
      usedTrends: trends
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Errore:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
