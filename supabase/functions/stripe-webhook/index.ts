
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { stripe } from "../_shared/stripe.ts"
import { supabase } from "../_shared/supabase.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      throw new Error('No signature provided')
    }

    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (!webhookSecret) {
      throw new Error('Webhook secret not configured')
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    console.log('Processing stripe webhook event:', event.type)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object
        const { error } = await supabase
          .from('subscriptions')
          .upsert({
            stripe_subscription_id: subscription.id,
            user_id: subscription.metadata.supabase_user_id,
            status: subscription.status,
            stripe_customer_id: subscription.customer,
            current_period_end: new Date(subscription.current_period_end * 1000),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })

        if (error) {
          console.error('Error updating subscription:', error)
          throw error
        }
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        const { error: deleteError } = await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            cancel_at_period_end: false,
          })
          .match({ stripe_subscription_id: deletedSubscription.id })

        if (deleteError) {
          console.error('Error deleting subscription:', deleteError)
          throw deleteError
        }
        break
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
