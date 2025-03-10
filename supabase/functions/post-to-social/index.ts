
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const FACEBOOK_APP_ID = Deno.env.get("FACEBOOK_APP_ID")?.trim();
const FACEBOOK_APP_SECRET = Deno.env.get("FACEBOOK_APP_SECRET")?.trim();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function postToFacebook(content: string, accessToken: string) {
  const url = `https://graph.facebook.com/v19.0/me/feed`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: content,
      access_token: accessToken,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Facebook API error:', errorData);
    throw new Error(`Facebook API error: ${errorData}`);
  }

  return response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, platform, accessToken } = await req.json();
    console.log(`Attempting to post to ${platform}...`);
    
    if (platform === 'facebook') {
      if (!accessToken) {
        throw new Error('Facebook access token is required');
      }
      
      const result = await postToFacebook(content, accessToken);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error(`Platform ${platform} not supported`);
  } catch (error) {
    console.error('Error posting to social:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
