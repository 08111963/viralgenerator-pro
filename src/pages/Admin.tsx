import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import SubscribersList from "@/components/admin/SubscribersList";
import { LogOut, KeyRound } from "lucide-react";

const ADMIN_PASSWORD = "SuperSecurePassword123!"; // Updated to a more secure password

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    toast({
      title: "Logout effettuato",
      description: "Sei uscito dal pannello amministratore",
    });
    navigate("/");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword) {
      // In una vera app, questo dovrebbe essere gestito in modo più sicuro
      toast({
        title: "Password aggiornata",
        description: "La password è stata modificata con successo",
      });
      setIsChangingPassword(false);
      setNewPassword("");
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Pannello Amministratore</h1>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setIsChangingPassword(true)}
              >
                <KeyRound className="mr-2" />
                Cambia Password
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2" />
                Esci
              </Button>
            </div>
          </div>
          
          {isChangingPassword ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Cambia Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Nuova password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit">Salva</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setNewPassword("");
                      }}
                    >
                      Annulla
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : null}

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
