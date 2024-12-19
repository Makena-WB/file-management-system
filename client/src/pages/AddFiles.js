// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { addFile, getFileById, updateFile, deleteFile } from "../features/apiCalls";

// const BASE_API_URL = "http://localhost:8081";

// const AddFile = () => {
//   const { id } = useParams();
//   const [defaultValue, setDefaultValue] = useState({
//     fileTitle: "",
//     fileDescription: "",
//     fileSize: "",
//     fileType: "",
//   });
//   const [selectedFile, setSelectedFile] = useState();
//   const [previewUrl, setPreviewUrl] = useState();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getFileDetails = async () => {
//       if (id) {
//         const { data } = await getFileById(id); // Destructure here
//         if (data) setDefaultValue({ ...data });
//       }
//     };
//     getFileDetails();
//   }, [id]);

//   useEffect(() => {
//     let url;
//     if (selectedFile) {
//       url = URL.createObjectURL(selectedFile);
//       setPreviewUrl(url);
//     }
//     return () => {
//       URL.revokeObjectURL(url);
//     };
//   }, [selectedFile]);

//   const { fileTitle, fileDescription, fileSize, fileType, fileId } = defaultValue;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(e.target);
  
//     let formData = new FormData(e.target);
//     let fileFormData = new FormData();
//     let files = e.target[4].files; // Assuming the file input is at index 4
//     const values = Object.fromEntries(formData.entries());

//     if (!values.fileTitle) {
//       console.error("FileName is required but not provided.");
//       alert("Please provide a file name.");
//       return;
//     }
  
//     const fileId = !values.fileId
//       ? values.fileTitle.toLowerCase().replace(/[\s\t]+/g, "-")
//       : values.fileId;
  
//     fileFormData.append("fileId", fileId);
  
//     delete values.filePath; // Assuming "filePath" will be managed by the API
  
//     try {
//       // If a file is selected, upload it
//       if (files && files.length > 0) {
//         fileFormData.append("file", files[0]);
//         const { data, error } = await addFile(fileFormData); // Replace with your API call
//         if (error) throw new Error(error);
//         values["filePath"] = data.filePath; // Assuming the response includes `filePath`
//       }
  
//       // Handle updates
//       if (fileId && !!values.fileId) {
//         const { data, error } = await updateFile(values, fileId); // Replace with your API call
//         if (error) throw new Error(error);
//         console.log("File updated successfully:", data);
//       }
//       // Handle new file submissions
//       else if (fileId) {
//         const formValues = {
//           fileId,
//           ...values,
//           filePath: values.filePath || "placeholder-file-path", // Default if no file uploaded
//         };
//         const { data, error } = await addFile(formValues); // Replace with your API call
//         if (error) throw new Error(error);
//         console.log("File added successfully:", data);
//       }
//     } catch (err) {
//       console.error("Error handling file submission:", err);
//     }
//   };
  
//   return (
//     <div className="container max-w-4xl mx-auto py-10">
//       <div className="flex space-x-6 mb-10 items-center">
//         <button
//           onClick={() => navigate(-1)}
//           className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
//         >
//           {"<"}
//         </button>
//         <h2 className="text-3xl font-bold text-gray-800">
//           {defaultValue.fileTitle ? "Update File" : "Add File"}
//         </h2>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">File Title</label>
//           <input
//             defaultValue={fileTitle || ""}
//             name="fileTitle"
//             placeholder="Enter File Title..."
//             type="text"
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">File Description</label>
//           <textarea
//             defaultValue={fileDescription || ""}
//             name="fileDescription"
//             placeholder="Enter a brief description..."
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//             rows={5}
//           ></textarea>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">File Size</label>
//             <input
//               defaultValue={fileSize || ""}
//               name="fileSize"
//               placeholder="Enter File Size..."
//               type="text"
//               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">File Type</label>
//             <input
//               defaultValue={fileType || ""}
//               name="fileType"
//               placeholder="Enter File Type..."
//               type="text"
//               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">File Upload</label>
//           <input
//             onChange={(e) => {
//               setSelectedFile(e.target.files[0]);
//             }}
//             accept="*"
//             name="file"
//             type="file"
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//           {fileId && previewUrl && (
//             <img
//               className="mt-4 h-48 w-auto object-cover rounded-lg shadow"
//               alt="file preview"
//               src={previewUrl || `${BASE_API_URL}/uploads/${fileId}`}
//             />
//           )}
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddFile;

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

    
    Object.keys(fileData).forEach((key) => {
      formData.append(key, fileData[key]);
    });

    
    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      alert("Please select a file to upload.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
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
