
import React from 'react';
import { Navigation } from "@/components/Navigation";
import SubscribersList from "@/components/admin/SubscribersList";
import { UserSearch } from "@/components/admin/UserSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

const Admin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handlePasswordChange = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      (await supabase.auth.getSession()).data.session?.user?.email || "",
      { redirectTo: `${window.location.origin}/reset-password` }
    );
    
    if (!error) {
      // Mostra un messaggio di successo
      alert("Controlla la tua email per il link di cambio password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container py-8">
        <div className="flex justify-end gap-4 mb-6">
          <Button variant="outline" onClick={handlePasswordChange}>
            <KeyRound className="mr-2" />
            Cambia Password
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2" />
            Esci
          </Button>
        </div>

        <Tabs defaultValue="search">
          <TabsList>
            <TabsTrigger value="search">Ricerca Utenti</TabsTrigger>
            <TabsTrigger value="subscribers">Abbonati</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>Ricerca Utenti</CardTitle>
              </CardHeader>
              <CardContent>
                <UserSearch />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle>Lista Abbonati</CardTitle>
              </CardHeader>
              <CardContent>
                <SubscribersList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
