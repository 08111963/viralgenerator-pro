// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vpgwwpiqwbxgsovjpzhh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZ3d3cGlxd2J4Z3NvdmpwemhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNzkyMDYsImV4cCI6MjA1Njk1NTIwNn0._Lt6wwVdVa31lrPf2SpYvXwd3TlosEyo5XFuBZI3-UE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);