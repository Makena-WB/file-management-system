// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import FileComponent from "../components/files";
// import { getFiles, getDirectories, updateDirectory, deleteDirectory } from "../features/apiCalls";

// const UploadsDirectoryPage = () => {
//   const { directoryId } = useParams(); 
//   const [files, setFiles] = useState([]);
//   const [directories, setDirectories] = useState([]);
//   const [editDirectoryId, setEditDirectoryId] = useState(null);
//   const [newDirectoryName, setNewDirectoryName] = useState("");

//   useEffect(() => {
//     const fetchFiles = async () => {
//       const { data, error } = await getFiles(directoryId); 
//       if (!error) {
//         setFiles(data);
//       } else {
//         console.error(error);
//       }
//     };

//     const fetchDirectories = async () => {
//       const { data, error } = await getDirectories(directoryId); 
//       if (!error) {
//         setDirectories(data);
//       } else {
//         console.error(error);
//       }
//     };

//     fetchFiles();
//     fetchDirectories();
//   }, [directoryId]);

//   const handleUpdateDirectory = async (directoryId) => {
//     if (!newDirectoryName.trim() === "") {
//       alert("Directory name cannot be empty.");
//       return;
//     }
  
//     try {
//       const { error } = await updateDirectory(directoryId, { directoryName: newDirectoryName });
  
//       if (!error) {
//         setEditDirectoryId(null); // Reset edit mode
//         setNewDirectoryName(""); // Clear the input
  
//         // Fetch directories again to update the UI
//         const { data, error } = await getDirectories(directoryId);
//         if (!error) {
//           setDirectories(data); // Update state with new directory list
//         } else {
//           console.error(error);
//         }
//       } else {
//         console.error("Error updating directory:", error);
//       }
//     } catch (error) {
//       console.error("Error updating directory:", error);
//     }
//   };
  

//   const handleDeleteDirectory = async (directoryId) => {
//     try {
//       const { error } = await deleteDirectory(directoryId);
//       if (!error) {
//         // Filter out the deleted directory and refetch directories
//         setDirectories((prev) => prev.filter((dir) => dir.directoryId !== directoryId));
//       } else {
//         console.error(error);
//       }
//     } catch (error) {
//       console.error("Error deleting directory:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-6">
//           <h2 className="text-3xl font-bold text-gray-800">Uploads Directory</h2>
//           <Link to="/addDirectory">
//             <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300">
//               Add Directory
//             </button>
//           </Link>
//           <Link to="/">
//             <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300">
//               Back to Files
//             </button>
//           </Link>
//         </div>

//         <div className="mb-8 border-b border-gray-300 pb-6">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Directories</h3>
//           {directories.length > 0 ? (
//             <ul className="space-y-4">
//               {directories.map((dir) => (
//                 <li key={dir.directoryId} className="flex items-center space-x-4">
//                   {editDirectoryId === dir.directoryId ? (
//                     <>
//                       <input
//                         type="text"
//                         value={newDirectoryName}
//                         onChange={(e) => setNewDirectoryName(e.target.value)}
//                         className="border border-gray-300 rounded-md p-2"
//                       />
//                       <button
//                         onClick={() => handleUpdateDirectory(dir.directoryId)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditDirectoryId(null)}
//                         className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <span>{dir.directoryName}</span>
//                       <button
//                         onClick={() => setEditDirectoryId(dir.directoryId)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteDirectory(dir.directoryId)}
//                         className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No Subdirectories Found.</p>
//           )}
//         </div>

//         <div>
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Files</h3>
//           {files.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {files.map((file) => (
//                 <FileComponent
//                   key={file.fileId}
//                   {...file}
//                   className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-64">
//               <p className="text-gray-500 text-lg font-medium">No Files Found.</p>
//               <Link to="/addFile">
//                 <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300">
//                   Add Your First File
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadsDirectoryPage;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FileComponent from "../components/files";
import { getFiles, getDirectories, updateDirectory, deleteDirectory } from "../features/apiCalls";

const UploadsDirectoryPage = () => {
  const { directoryId } = useParams(); 
  const [files, setFiles] = useState([]);
  const [directories, setDirectories] = useState([]);
  const [editDirectoryId, setEditDirectoryId] = useState(null);
  const [newDirectoryName, setNewDirectoryName] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await getFiles(directoryId); 
      if (!error) {
        setFiles(data);
      } else {
        console.error(error);
      }
    };

    const fetchDirectories = async () => {
      const { data, error } = await getDirectories(directoryId); 
      if (!error) {
        setDirectories(data);
      } else {
        console.error(error);
      }
    };

    fetchFiles();
    fetchDirectories();
  }, [directoryId]);

  const handleUpdateDirectory = async (directoryId) => {
    if (!newDirectoryName.trim() === "") {
      alert("Directory name cannot be empty.");
      return;
    }
  
    try {
      const { error } = await updateDirectory(directoryId, { directoryName: newDirectoryName });
  
      if (!error) {
        setEditDirectoryId(null); // Reset edit mode
        setNewDirectoryName(""); // Clear the input
  
        // Fetch directories again to update the UI
        const { data, error } = await getDirectories(directoryId);
        if (!error) {
          setDirectories(data); // Update state with new directory list
        } else {
          console.error(error);
        }
      } else {
        console.error("Error updating directory:", error);
      }
    } catch (error) {
      console.error("Error updating directory:", error);
    }
  };
  

  const handleDeleteDirectory = async (directoryId) => {
    try {
      const { error } = await deleteDirectory(directoryId);
      if (!error) {
        // Filter out the deleted directory and refetch directories
        setDirectories((prev) => prev.filter((dir) => dir.directoryId !== directoryId));
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error("Error deleting directory:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-6">
          <h2 className="text-3xl font-bold text-gray-800">Uploads Directory</h2>
          <Link to="/addDirectory">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300">
              Add Directory
            </button>
          </Link>
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300">
              Back to Files
            </button>
          </Link>
        </div>

        <div className="mb-8 border-b border-gray-300 pb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Directories</h3>
          {directories.length > 0 ? (
            <ul className="space-y-4">
              {directories.map((dir) => (
                <li key={dir.directoryId} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                  {editDirectoryId === dir.directoryId ? (
                    <>
                      <input
                        type="text"
                        value={newDirectoryName}
                        onChange={(e) => setNewDirectoryName(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                      <button
                        onClick={() => handleUpdateDirectory(dir.directoryId)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditDirectoryId(null)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{dir.directoryName}</span>
                      <button
                        onClick={() => setEditDirectoryId(dir.directoryId)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDirectory(dir.directoryId)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No Subdirectories Found.</p>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Files</h3>
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
              <p className="text-gray-500 text-lg font-medium">No Files Found.</p>
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

export default UploadsDirectoryPage;
