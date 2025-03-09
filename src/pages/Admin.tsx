
import React from 'react';
import { Navigation } from "@/components/Navigation";
import SubscribersList from "@/components/admin/SubscribersList";
import { UserSearch } from "@/components/admin/UserSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container py-8">
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
