import React, { useContext } from "react";
import WithTitle from "../../with-title";
import Card from "../../card";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../../context/store";

const GroupDetails = () => {
  const { groupId } = useParams();
  const { groups } = useContext(GlobalContext);

  const activeGroup = groups.find((group) => group.id === groupId);

  const handleBackButtonClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    console.log(event);
  };

  return (
    <WithTitle title={`Group ${activeGroup?.name}`}>
      <Card>
        <div className="buttons flex flex-row mb-5">
          <Button variant="contained" onClick={handleBackButtonClick} startIcon={<ArrowBackIcon />} href="/">
            Back
          </Button>
        </div>
        <div className="details flex flex-col gap-10">
          <div className="description">
            <div className="text-1xl font-bold">Description</div>
            <span>{activeGroup?.description}</span>
          </div>
          <div className="priority">
            <div className="text-1xl font-bold">Priority</div>
            <span>{activeGroup?.priority}</span>
          </div>
        </div>
      </Card>
    </WithTitle>
  );
};

export default GroupDetails;
