import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import DetailsNote from "./pages/DetailsNote";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="note/:id" element={<DetailsNote />} />
      </Routes>
    </>
  );
};

export default App;
