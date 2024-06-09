import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ISortableItemProps {
  id: string;
  children: React.ReactNode;
  classname?: string;
}

export function SortableItem({ id, children, classname }: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className={classname} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
