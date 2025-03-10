
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Move } from 'lucide-react';
import { WidgetKey } from '@/hooks/useDashboardSettings';

interface SortableWidgetProps {
  id: WidgetKey;
  children: React.ReactNode;
}

export function SortableWidget({ id, children }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group bg-white rounded-lg shadow-sm"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 flex items-center px-3 cursor-move bg-gray-50 hover:bg-gray-100 rounded-l-lg transition-colors"
        aria-label="Riordina widget"
      >
        <Move className="h-6 w-6 text-gray-600" />
      </div>
      <div className="pl-12 w-full">
        {children}
      </div>
    </div>
  );
}
