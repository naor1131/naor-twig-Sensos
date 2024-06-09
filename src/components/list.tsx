import React, { useState } from "react";

interface IListOptions {
  enableReorder?: boolean;
}
interface IListProps<T> {
  items: T[];
  getItemKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  options?: IListOptions;
  onItemReorder?: (oldIndex: number, newIndex: number) => void;
}

const List = <T extends {}>({ items, renderItem, getItemKey }: IListProps<T>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingItemKey, setDraggingItemKey] = useState(null);

  const onMouseDownHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    // setDraggingItemKey();
  };

  // onMouseDown={} onMouseUp={} onMouseMove={}
  return (
    <div className="list">
      <div className="list-items">
        {items.map((item) => {
          return (
            <div key={getItemKey(item)} className="list-item">
              {renderItem(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
