import React from "react";

const BASE_API_URL = "http://localhost:8081"; // Base API URL for file uploads

const File = ({
  fileId,
  fileName,
  filePath,
}) => {
  return (
    <>
      <div className="border-2 rounded overflow-hidden flex flex-col">
        <img
          className="h-52 w-full object-cover"
          alt={`${fileId}-thumbnail`}
          src={`${BASE_API_URL}/uploads/${filePath}`}
        />
        <div className="flex flex-col p-4">
          <h4 className="mb-1 text-xl font-medium mt-5">{fileName}</h4>
        </div>
      </div>
    </>
  );
};

export default File;
