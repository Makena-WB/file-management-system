import React, { useState } from "react";

const DirectoryForm = ({ onSubmit, error }) => {
  const [directoryName, setDirectoryName] = useState("");
  const [parentDirectoryId, setParentDirectoryId] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ directoryName, parentDirectoryId });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label htmlFor="directoryName" className="block text-gray-700 font-medium">
          Directory Name
        </label>
        <input
          type="text"
          id="directoryName"
          name="directoryName"
          value={directoryName}
          onChange={(e) => setDirectoryName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="parentDirectoryId" className="block text-gray-700 font-medium">
          Parent Directory ID
        </label>
        <input
          type="text"
          id="parentDirectoryId"
          name="parentDirectoryId"
          value={parentDirectoryId}
          onChange={(e) => setParentDirectoryId(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-300"
      >
        Add Directory
      </button>
    </form>
  );
};

export default DirectoryForm;
