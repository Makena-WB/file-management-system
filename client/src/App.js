import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddFile from "./pages/AddFiles";   
import Files from "./pages/Files";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/addFile" element={<AddFile />} />   {/* File upload page */}
        <Route path="/" element={<Files />} />            {/* List of uploaded files */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

