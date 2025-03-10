
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { DateTimePicker } from "@/components/ui/date-time-picker";

interface OptimizedContentProps {
  optimizedContent: string;
  onOptimizedContentChange: (value: string) => void;
  scheduledTime?: Date;
  onScheduledTimeChange: (date?: Date) => void;
  onSchedule: () => void;
}

export const OptimizedContent = ({
  optimizedContent,
  onOptimizedContentChange,
  scheduledTime,
  onScheduledTimeChange,
  onSchedule
}: OptimizedContentProps) => {
  if (!optimizedContent) return null;

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Contenuto ottimizzato</label>
        <Textarea
          value={optimizedContent}
          onChange={(e) => onOptimizedContentChange(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Programma pubblicazione</label>
        <div className="flex gap-4">
          <DateTimePicker
            date={scheduledTime}
            setDate={onScheduledTimeChange}
          />
          <Button 
            onClick={onSchedule}
            disabled={!scheduledTime}
            variant="outline"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Programma
          </Button>
        </div>
      </div>
    </>
  );
};
