
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
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
      className="relative flex group"
    >
      <button
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"
        aria-label="Riordina widget"
      >
        <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </button>
      <div className="flex-1 pl-12">
        {children}
      </div>
    </div>
  );
}
