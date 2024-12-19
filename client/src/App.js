import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddFile from "./pages/AddFiles";   
import Files from "./pages/Files";

function App() {
  return (
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Files />} />
    <Route path="/addFile" element={<AddFile />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;

