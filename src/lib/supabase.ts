
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vpgwwpiqwbxgsovjpzhh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZ3d3cGlxd2J4Z3NvdmpwemhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNzkyMDYsImV4cCI6MjA1Njk1NTIwNn0._Lt6wwVdVa31lrPf2SpYvXwd3TlosEyo5XFuBZI3-UE';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

