import React from "react";
import WithTitle from "../../with-title";
import Card from "../../card";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddGroupForm from "../forms/add-group-form";

const AddGroup = () => {
  const handleBackButtonClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    console.log(event);
  };

  return (
    <WithTitle title="Add New Group">
      <Card>
        <div className="buttons flex flex-row mb-5">
          <Button variant="contained" onClick={handleBackButtonClick} startIcon={<ArrowBackIcon />} href="/">
            Back
          </Button>
        </div>

        <AddGroupForm />
      </Card>
    </WithTitle>
  );
};

export default AddGroup;
