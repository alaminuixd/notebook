import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import DetailsNote from "./pages/DetailsNote";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";

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
