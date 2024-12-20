import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDirectory } from "../features/apiCalls"; 
import DirectoryForm from "../components/DirectoryForm"; 

const AddDirectory = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (formData) => {
    const { data, error: apiError } = await addDirectory(formData);

    if (!apiError) {
        navigate(`/directory/${formData.parentDirectoryId}`);
      } else {
        setError(apiError.message || "Failed to add directory.");
      }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Add Directory</h2>
        </div>

        <DirectoryForm onSubmit={handleSubmit} error={error} />
      </div>
    </div>
  );
};

export default AddDirectory;
