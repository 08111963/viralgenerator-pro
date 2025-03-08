
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SubscribersList from "@/components/admin/SubscribersList";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!session?.user?.id) {
        setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error checking admin status:', error);
        toast({
          variant: "destructive",
          title: "Errore",
          description: "Errore nel verificare i permessi di amministratore",
        });
        setIsAdmin(false);
        return;
      }

      setIsAdmin(!!data);
    };

    checkAdminStatus();
  }, [session, toast]);

  const handleLogout = () => {
    supabase.auth.signOut();
    toast({
      title: "Logout effettuato",
      description: "Sei uscito dal pannello amministratore",
    });
    navigate("/");
  };

  // Show loading state while checking admin status
  if (isAdmin === null) {
    return <div>Caricamento...</div>;
  }

  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Pannello Amministratore</h1>
          <div className="flex gap-4">
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2" />
              Esci
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista Abbonati</CardTitle>
            </CardHeader>
            <CardContent>
              <SubscribersList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
