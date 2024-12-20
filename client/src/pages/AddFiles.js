import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddFile = () => {
  const [fileData, setFileData] = useState({
    title: "",
    description: "",
    size: "",
    type: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Append file data details
    formData.append("fileName", fileData.title);      // Use title for fileName
    formData.append("filePath", selectedFile.path);   // Use selectedFile.path for filePath
    formData.append("fileSize", selectedFile.size);   // File size from selected file
    formData.append("fileType", selectedFile.type);   // File type from selected file
    formData.append("parentDirectoryId", selectedId); // Assume selectedDirId is provided
    formData.append("file", selectedFile);  // Append the selected file
  
    try {
      await axios.post("http://localhost:8081/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");  // Redirect to the home page after successful upload
    } catch (err) {
      console.error(err);
      setError(true);  // Show error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New File</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">File Title</label>
            <input
              type="text"
              placeholder="File Title"
              name="title"
              value={fileData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">File Description</label>
            <textarea
              rows={4}
              placeholder="File Description"
              name="description"
              value={fileData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">File Size</label>
              <input
                type="text"
                placeholder="File Size"
                name="size"
                value={fileData.size}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">File Type</label>
              <input
                type="text"
                placeholder="File Type"
                name="type"
                value={fileData.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">File Upload</label>
            <input
              type="file"
              name="file"
              accept="*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add File
          </button>
        </form>
        {error && (
          <p className="mt-4 text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
        <Link
          to="/"
          className="mt-6 inline-block text-blue-500 hover:underline text-sm"
        >
          View All Files
        </Link>
      </div>
    </div>
  );
};

export default AddFile;
