import React from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./sortable-item";
import ReorderIcon from "@mui/icons-material/Reorder";

interface ITableOptions {
  enableReorder?: boolean;
  hideColumnsByName?: string[];
}
export interface ITableActionButton {
  id: string;
  icon: React.ReactNode;
  action: (rowKey: string) => void;
}

interface ITableProps<T> {
  data: T[];
  options?: ITableOptions;
  actionButtons?: ITableActionButton[];
  getRowKey: (row: T) => string;
  onRowReorder?: (oldIndex: number, newIndex: number) => void;
}

const Table = <T extends {}>({ data, options, getRowKey, onRowReorder, actionButtons }: ITableProps<T>) => {
  const headers = Object.keys(data?.[0] ?? {}).filter((key) => !options?.hideColumnsByName?.includes(key));

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = data.findIndex((row) => getRowKey(row) === active.id);
      const newIndex = data.findIndex((row) => getRowKey(row) === over?.id);

      onRowReorder?.(oldIndex, newIndex);
    }
  }

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const TableJSX = (
    <div className="w-full table">
      <div className="headers table-row">
        {options?.enableReorder && <div className="header table-cell text-left" style={{ width: 50 }}></div>}
        {headers.map((key) => {
          return (
            <div key={key} id={key} className="header table-cell text-left font-bold">
              {capitalize(key)}
            </div>
          );
        })}
        {actionButtons?.length && <div className="action-buttons table-cell"></div>}
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.map((row) => getRowKey(row))} strategy={verticalListSortingStrategy}>
          {data.map((row, rowIndex) => {
            const rowKey = getRowKey(row);
            return (
              <SortableItem key={rowKey} id={rowKey} classname="table-row">
                {options?.enableReorder && (
                  <div className="table-cell">
                    <ReorderIcon />
                  </div>
                )}
                {Object.entries(row)
                  .filter((entry) => headers.includes(entry[0]))
                  .map((entry) => {
                    const [key, value] = entry;
                    return (
                      <div key={key} className="table-cell">
                        {value as React.ReactNode}
                      </div>
                    );
                  })}
                {
                  <div className="table-cell">
                    <div className="flex flex-row">
                      {actionButtons?.map((actionButton) => {
                        return (
                          <div key={actionButton.id} className="icon" onClick={() => actionButton.action(rowKey)}>
                            {actionButton.icon}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                }
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );

  const NoRowsJSX = (
    <div className="w-full h-32 bg-gray-200 flex justify-center items-center">
      <p className="text-center">No rows to show.</p>
    </div>
  );

  return data.length > 0 ? TableJSX : NoRowsJSX;
};

export default Table;
