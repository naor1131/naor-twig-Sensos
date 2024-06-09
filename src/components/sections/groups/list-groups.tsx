import React, { useContext } from "react";
import WithTitle from "../../with-title";
import { saveGroups } from "../../../services/groups";
import Card from "../../card";
import Table, { ITableActionButton } from "../../table";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context/store";

const ListGroups = () => {
  const { groups, setGroups } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleTableReorder(oldIndex: number, newIndex: number): void {
    const newGroups = [...groups];
    if (newIndex === oldIndex) return;

    // change priority of the dragged node.
    const targetPriority = newGroups[newIndex].priority;
    newGroups[oldIndex].priority = targetPriority;

    // change priority for indexes dragged node has passed through
    if (newIndex > oldIndex) {
      for (let i = newIndex; i > oldIndex; i--) {
        newGroups[i].priority--;
      }
    } else {
      for (let i = newIndex; i < oldIndex; i++) {
        newGroups[i].priority++;
      }
    }

    setGroups?.(newGroups);
    saveGroups(newGroups);
  }

  const actionButtons: ITableActionButton[] = [
    { id: "details", icon: <ImageSearchIcon />, action: (rowKey) => navigate(`/group-details/${rowKey}`) },
  ];

  return (
    <WithTitle title="Groups">
      <Card>
        <div className="buttons flex flex-row mb-5">
          <Button variant="contained" startIcon={<AddIcon />} href="/add-group">
            Add Group
          </Button>
        </div>
        <Table
          data={groups.sort((a, b) => a.priority - b.priority)}
          onRowReorder={handleTableReorder}
          actionButtons={actionButtons}
          getRowKey={(row) => row.id}
          options={{ enableReorder: true, hideColumnsByName: ["id"] }}
        />
      </Card>
    </WithTitle>
  );
};

export default ListGroups;
