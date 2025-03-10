
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
      className="relative group bg-white rounded-lg shadow-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 px-3 opacity-0 group-hover:opacity-100 cursor-move transition-all duration-200 hover:bg-gray-50 rounded-l-lg flex items-center"
        aria-label="Riordina widget"
      >
        <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </button>
      <div className="pl-12 w-full">
        {children}
      </div>
    </div>
  );
}
