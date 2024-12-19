import React, { useEffect, useState } from "react";
import FileComponent from "../components/files";
import { getFiles } from "../features/apiCalls"; // API call to get files
import { Link } from "react-router-dom";

const Files = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await getFiles();
      if (!error) {
        console.error(error);
      } else {
        setFiles(data);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">File Inventory</h2>
          <Link to="/addFile">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300">
              Add File
            </button>
          </Link>
        </div>

        {/* File Grid */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file) => (
                <FileComponent
                  key={file.fileId}
                  {...file}
                  className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-500 text-lg font-medium">
                No Files Found.
              </p>
              <Link to="/addFile">
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300">
                  Add Your First File
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Files;



