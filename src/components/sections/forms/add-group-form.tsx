import React, { useContext } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { GlobalContext } from "../../../context/store";
import { Group } from "../../../types";
import { TextField, Button } from "@mui/material";
import { saveGroups } from "../../../services/groups";

function AddGroupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { groups, setGroups } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onValidSubmit: SubmitHandler<FieldValues> = (data) => {
    const maxPriority = groups.length > 0 ? Math.max(...groups.map((group) => group.priority)) : 0;
    const newGroup: Group = {
      id: uuid(),
      name: data["name"],
      description: data["description"],
      priority: maxPriority + 1,
    };

    const newGroups = [...groups, newGroup];

    setGroups(newGroups);
    saveGroups(newGroups);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit)}>
      <div className="flex flex-col gap-6 mb-5">
        <div className="flex flex-col">
          <TextField
            id="name"
            type="text"
            {...register("name", { required: true })}
            label="Name"
            variant="outlined"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500" role="alert">
              *name is required
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <TextField
            id="description"
            aria-label="minimum height"
            label="Description"
            multiline
            minRows={3}
            {...register("description", { required: true })}
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description?.type === "required" && (
            <p className="text-red-500" role="alert">
              *name is required
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-center gap-5">
        <Button type="button" variant="outlined" color="primary" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddGroupForm;
