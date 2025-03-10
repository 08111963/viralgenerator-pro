
import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';
import { Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Subscriber {
  id: string;
  username: string;
  created_at: string;
  avatar_url: string | null;
}

const SubscribersList = () => {
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, created_at, avatar_url");

      if (error) throw error;
      return data as Subscriber[];
    },
  });

  if (isLoading) {
    return <div>Caricamento utenti...</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Utenti Abbonati</h2>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Data Iscrizione</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers?.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell>{subscriber.username || 'Utente anonimo'}</TableCell>
              <TableCell>
                {new Date(subscriber.created_at).toLocaleDateString('it-IT')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubscribersList;
