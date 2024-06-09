import React, { createContext, useEffect, useState } from "react";
import { Group } from "../types";
import { loadGroups } from "../services/groups";

interface GlobalState {
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}

const INITIAL_STATE: GlobalState = {
  groups: [],
  setGroups: () => {},
};

const GlobalContext = createContext(INITIAL_STATE);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const storedGroups = loadGroups();
    setGroups(storedGroups);
  }, []);

  return <GlobalContext.Provider value={{ groups, setGroups }}>{children}</GlobalContext.Provider>;
};

export { GlobalProvider, GlobalContext };
