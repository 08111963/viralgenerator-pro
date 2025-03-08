
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { stripe } from "../_shared/stripe.ts"
import { supabase } from "../_shared/supabase.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Request received:', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries())
  });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { priceId } = await req.json()
    console.log('Received priceId:', priceId);
    
    const authHeader = req.headers.get('Authorization')
    console.log('Auth header present:', !!authHeader);
    
    if (!authHeader) {
      throw new Error('Missing auth header')
    }
    
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    
    console.log('User authentication result:', {
      userFound: !!user,
      error: userError?.message
    });
    
    if (userError || !user) {
      throw new Error('Invalid token')
    }

    // Check if user already has a customer ID
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle()

    console.log('Subscription check:', {
      existingCustomerId: subscriptions?.stripe_customer_id,
      error: subError?.message
    });

    let customerId = subscriptions?.stripe_customer_id

    // Create a new customer if doesn't exist
    if (!customerId) {
      console.log('Creating new Stripe customer for user:', user.email);
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id
      console.log('New customer created:', customer.id);
    }

    // Use consistent URLs for both development and production
    const baseUrl = 'https://viralgenerator-pro.lovable.app'
    console.log('Creating checkout session with base URL:', baseUrl)

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${baseUrl}/dashboard?success=true`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
        },
      },
      allow_promotion_codes: true
    })

    console.log('Checkout session created:', {
      id: session.id,
      success_url: session.success_url,
      cancel_url: session.cancel_url,
      url: session.url
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Checkout error:', {
      message: error.message,
      stack: error.stack
    });
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
