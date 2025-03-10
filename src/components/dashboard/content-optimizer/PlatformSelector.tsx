
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlatformSelectorProps {
  platform: string;
  onPlatformChange: (value: string) => void;
}

export const PlatformSelector = ({
  platform,
  onPlatformChange
}: PlatformSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      <Select value={platform} onValueChange={onPlatformChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleziona piattaforma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="facebook">Facebook</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

