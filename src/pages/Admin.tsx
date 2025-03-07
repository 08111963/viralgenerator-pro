
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "admin123"; // In a real app, this should be stored securely

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Accesso effettuato",
        description: "Benvenuto nel pannello amministratore",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Password non valida",
      });
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Pannello Amministratore</h1>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistiche</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Pannello in costruzione...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 container flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Accesso Amministratore</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password amministratore"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Accedi
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
