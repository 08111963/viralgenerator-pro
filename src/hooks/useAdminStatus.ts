import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';

export const useAdminStatus = () => {
  const { data: isAdmin } = useQuery({
    queryKey: ["admin-status"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      const { data, error } = await supabase
        .rpc('is_admin', { user_id: session.user.id });

      if (error) {
        console.error("Error checking admin status:", error);
        return false;
      }
      
      return !!data;
    },
  });

  return isAdmin;
};
