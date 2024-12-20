import React from "react";
import { Link } from "react-router-dom";
import { deleteFile } from "../features/apiCalls";

const BASE_API_URL = "http://localhost:8081"; // Base API URL for file uploads

const File = ({
  fileId,
  fileName,
  filePath,
  fileDescription, 
  fileSize, 
}) => {
  return (
    <>
      <div className="border-2 rounded overflow-hidden flex flex-col">
        {filePath ? (
          <img
            className="h-52 w-full object-cover"
            alt={`${fileId}-thumbnail`}
            src={`${BASE_API_URL}/uploads/${filePath}`}
          />
        ) : (
          <div className="w-full h-48 bg-slate-200 rounded"></div>
        )}
        <div className="flex flex-col p-4">
          <h4 className="mb-1 text-xl font-medium mt-5">{fileName}</h4>
          <p className="text-lg mb-4">{fileDescription || "No description available"}</p>
          <p className="text-sm text-gray-500">{fileSize ? `${fileSize} MB` : "File size not available"}</p>
          <div>
            <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-5 my-5">
              <Link className="w-full" to={`/updateFile/${fileId}`}>
                <button className="uppercase w-full font-medium">Update</button>
              </Link>
              <button
                onClick={async () => {
                  await deleteFile(fileId, filePath); 
                  console.log("Deleted");
                }}
                className="uppercase border-gray-500 text-gray-500 w-full font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default File;
