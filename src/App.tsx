import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListGroups from "./components/sections/groups/list-groups";
import AddGroup from "./components/sections/groups/add-group";
import GroupDetails from "./components/sections/groups/group-details";
import { GlobalProvider } from "./context/store";

import "./App.css";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={ListGroups} />
            <Route path="/add-group" Component={AddGroup} />
            <Route path="/group-details/:groupId" Component={GroupDetails} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;
