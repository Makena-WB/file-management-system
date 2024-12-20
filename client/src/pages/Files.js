// import React, { useEffect, useState } from "react";
// import FileComponent from "../components/files";
// import { getFiles, getDirectories } from "../features/apiCalls"; 
// import { Link } from "react-router-dom";

// const Files = () => {
//   const [files, setFiles] = useState([]);
//   const [directories, setDirectories] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       const { data, error } = await getFiles();
//       if (!error) {
//         setFiles(data); 
//       } else {
//         console.error(error);
//       }
//     };

//     const fetchDirectories = async () => {
//       const { data, error } = await getDirectories();
//       if (!error) {
//         setDirectories(data); 
//       } else {
//         console.error(error);
//       }
//     };

//     fetchFiles();
//     fetchDirectories();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">File Inventory</h2>
//           <Link to="/directories">
//               <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300">
//                 Directories
//               </button>
//           </Link>
//         </div>

//         {/* Directories Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <div>
//             <h3 className="text-2xl font-semibold text-gray-800 mb-4">Directories</h3>
//             {directories.length > 0 ? (
//               <ul className="space-y-4">
//                 {directories.map((dir) => (
//                   <li key={dir.directoryId} className="flex items-center">
//                     <Link
//                       to={`/directory/${dir.directoryId}`}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md shadow transition duration-300"
//                     >
//                       {dir.directoryName}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500">No Directories Found.</p>
//             )}
//           </div>

//           {/* Files Section */}
//           <div>
//             <h3 className="text-2xl font-semibold text-gray-800 mb-4">Files</h3>
//             {files.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {files.map((file) => (
//                   <FileComponent
//                     key={file.fileId}
//                     {...file}
//                     className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-64">
//                 <p className="text-gray-500 text-lg font-medium">
//                   No Files Found.
//                 </p>
//                 <Link to="/addFile">
//                   <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300">
//                     Add Your First File
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Files;

import React, { useEffect, useState } from "react";
import FileComponent from "../components/files";
import { getFiles, getDirectories } from "../features/apiCalls"; 
import { Link } from "react-router-dom";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await getFiles();
      if (!error) {
        setFiles(data); 
      } else {
        console.error(error);
      }
    };

    const fetchDirectories = async () => {
      const { data, error } = await getDirectories();
      if (!error) {
        setDirectories(data); 
      } else {
        console.error(error);
      }
    };

    fetchFiles();
    fetchDirectories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-6">
          <h2 className="text-3xl font-serif font-semibold text-gray-800">File Inventory</h2>
          <Link to="/directories">
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-sans hover:font-serif font-semibold px-5 py-2 rounded-md shadow transition duration-300">
              Directories
            </button>
          </Link>
        </div>

       {/* Directories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 border-b border-gray-300 pb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Directories</h3>
            
            <div className="mb-4">
              <Link
                to="/directory/root" // Link to Root Directory Page
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300 mr-4"
              >
                Root Directory
              </Link>
              <Link
                to="/directory/uploads" // Link to Upload Directory Page
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
              >
                Upload Directory
              </Link>
            </div>

            {directories.length > 0 ? (
              <ul className="space-y-4">
                {directories.map((dir) => (
                  <li key={dir.directoryId} className="flex items-center space-x-4">
                    <Link
                      to={`/directory/${dir.directoryId}`} // Direct link to DirectoryPage
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md shadow transition duration-300 w-full text-center"
                    >
                      {dir.directoryName}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No Directories Found.</p>
            )}
          </div>

          {/* Files Section */}
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
                <p className="text-gray-500 text-lg font-medium">
                  No Files Found.
                </p>
                <Link to="/addFile">
                  <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-sans hover:font-serif font-semibold px-5 py-2 rounded-md shadow transition duration-300">
                    Add Your First File
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
