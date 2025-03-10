
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

interface TemplateFormProps {
  templateName: string;
  content: string;
  onTemplateNameChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSaveTemplate: () => void;
}

export const TemplateForm = ({
  templateName,
  content,
  onTemplateNameChange,
  onContentChange,
  onSaveTemplate
}: TemplateFormProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4 mb-2">
        <Input
          placeholder="Nome del template"
          value={templateName}
          onChange={(e) => onTemplateNameChange(e.target.value)}
        />
        <Button onClick={onSaveTemplate} variant="outline">
          <Save className="h-4 w-4 mr-2" />
          Salva Template
        </Button>
      </div>
      <label className="text-sm font-medium">Contenuto originale</label>
      <Textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Inserisci il tuo contenuto qui..."
        rows={4}
      />
    </div>
  );
};
