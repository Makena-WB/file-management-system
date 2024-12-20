import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddFile from "./pages/AddFiles";   
import Files from "./pages/Files";
import DirectoryPage from "./pages/DirectoryPage";
import AddDirectory from "./pages/AddDirectory";
import RootDirectory from "./pages/RootDirectory";  
import UploadDirectory from "./pages/UploadDirectory";  


function App() {
  return (
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Files />} />
    <Route path="/addFile" element={<AddFile />} />
    <Route path="/directories" element={<DirectoryPage />} />
    <Route path="/addDirectory" element={<AddDirectory />} />
    <Route path="/root" element={<RootDirectory />} />  
    <Route path="/uploads" element={<UploadDirectory />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;

