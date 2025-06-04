import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

import { Card, Button, Spinner, Modal, Form } from "react-bootstrap";
import { useColumns } from "../../hooks/useColumns";

// Types
import { Column, Task } from "../../types/kanban";
import Column1, { ColumnType } from "./Column1";
import { useBoards } from "../../hooks/useBoards";
import KanbanAvatars from "../../components/KanbanAvatars";
import SearchableDropdown from "../../components/SearchableDropdown";
import TaskCard from "../../components/TaskCard";

const initialUsers = [
  { id: "1", name: "Alice", avatar: "https://coreui.io/bootstrap/docs/assets/img/avatars/1.jpg", selected: false },
  { id: "2", name: "Bob", avatar: "https://coreui.io/bootstrap/docs/assets/img/avatars/2.jpg", selected: false },
  { id: "3", name: "Carol", avatar: "https://coreui.io/bootstrap/docs/assets/img/avatars/3.jpg", selected: false },
  { id: "4", name: "Dave", avatar: "https://coreui.io/bootstrap/docs/assets/img/avatars/4.jpg", selected: false },
  { id: "5", name: "Eve", avatar: "https://coreui.io/bootstrap/docs/assets/img/avatars/5.jpg", selected: false },
];

const Kanban: React.FC = () => {
  const { boards, loading: loadingBoard, error: errorBoard, addBoard } = useBoards();
  const { columns: initialColumns, loading, error, updateTaskByColumn, } = useColumns();
  const [users, setUsers] = useState(initialUsers);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [newBoardName, setNewBoardName] = useState<string | undefined>("");

  // get Board name by id 
  const getBoardNameById = () => {
    const boardId = [...initialColumns][0]?.boardId;
    const board = boards.find((b) => b.id == boardId);
    setNewBoardName(board?.name);
  };

  // get initials columns from the first board
  useEffect(() => {
    getBoardNameById();
    if (initialColumns.length) {
      const transformed: any = initialColumns.map((column) => ({
        id: String(column.name),        // or use: `Column${column.id}` if needed
        title: String(column.name),
        cards: column.Tasks.map((task) => ({
          id: `Card${task.id}`,         // you can also use task.title
          title: task.title,
        })),
      }));

      console.log("Transformed Data:", transformed);
      setColumns(transformed); // Optional: set to another state if needed
    }
  }, [initialColumns]);


  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null;
    }
    // overの対象がcolumnの場合があるためそのままidを返す
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length)
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleBoardSelect = (board: { id: number; name: string }) => {
    console.log("Selected board:", board);
  };

  const handleSelect = (clickedUser: any) => {
    const updated = users.map((user) =>
      user.id === clickedUser.id
        ? { ...user, selected: !user.selected } // toggle
        : user
    );
    setUsers(updated);
  };

  if (loading || !columns.length) return <Spinner animation="border" />;

  return (
    <>
      <div className="container p-0">
        <div className="align-items-center d-flex justify-content-between">
          <h2 className="text-capitalize">{newBoardName}</h2>
          <SearchableDropdown options={boards} onSelect={handleBoardSelect} placeholder="Select a board" />
          <form className="row g-3">
            <div className="col-auto">
              <input type="text" className="form-control" id="search-board" placeholder="Search here" />
            </div>
          </form>

        </div>
        <div className="row mt-3">
          <div className="col-12">
            {/* <KanbanAvatars /> */}
            <KanbanAvatars users={users} onSelect={handleSelect} />
          </div>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div
            className="App mt-3"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {columns.map((column) => (
              <Column1
                key={column.id}
                id={column.id}
                title={column.title}
                cards={column.cards}
              ></Column1>
            ))}
          </div>
        </DndContext>
      </div>
    </>
  );
};

export default Kanban;
