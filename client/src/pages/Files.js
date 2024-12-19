import React, { useEffect, useState } from "react";
import FileComponent from "../components/files"; 
import { getFiles } from "../features/apiCalls"; // API call to get files
import { Link } from "react-router-dom";

const Files = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await getFiles();
      if (error) {
        console.log(error);
      } else {
        setFiles(data);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="container py-10 w-full max-w-5xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold">File Inventory</h2>
        <Link to="/addFile">
          <button>Add File</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-6 md:gap-6">
        {files.length > 0 ? (
          files.map((file) => (
            <FileComponent key={file.fileId} {...file} />
          ))
        ) : (
          <p>No Files Found.</p>
        )}
      </div>
    </div>
  );
};

export default Files;
