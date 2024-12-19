import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addFile, getFileById, updateFile, deleteFile } from "../features/apiCalls";

const BASE_API_URL = "http://localhost:8081";

const AddFile = () => {
  const { id } = useParams();
  const [defaultValue, setDefaultValue] = useState({
    fileTitle: "",
    fileDescription: "",
    fileSize: "",
    fileType: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getFileDetails = async () => {
      if (id) {
        const { data } = await getFileById(id);
        if (data) setDefaultValue({ ...data });
      }
    };
    getFileDetails();
  }, [id]);

  useEffect(() => {
    let url;
    if (selectedFile) {
      url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  const { fileTitle, fileDescription, fileSize, fileType, fileId } = defaultValue;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const fId = !fileId
      ? values.fileTitle.toLowerCase().replaceAll(/[\s\t]+/g, "-")
      : fileId;

    formData.append("fileId", fId);

    try {
      if (selectedFile) {
        formData.append("file", selectedFile);

        // Upload the file and store additional metadata
        let { data, error } = await addFile(formData);
        if (error) throw new Error(error);
        values["file"] = data; // Save the uploaded file data (file ID or URL)
      }

      if (fId && !!fileId) {
        let { data, error } = await updateFile(values, fileId);
        if (error) throw new Error(error);
      } else if (fId) {
        let { data, error } = await addFile(values); // Add new file
        if (error) throw new Error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container max-w-5xl py-10">
      <div className="flex space-x-6 mb-10 items-center">
        <button
          onClick={() => navigate(-1)}
          className="h-10 leading-none text-xl"
        >
          {"<"}
        </button>
        <h2 className="text--title">
          {defaultValue.fileTitle ? "Update File" : "Add File"}
        </h2>
      </div>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>File Title</label>
            <input
              defaultValue={fileTitle || ""}
              name="fileTitle"
              placeholder="Enter File Title..."
              type="text"
            />
          </div>
          <div className="mb-4">
            <label>File Description</label>
            <textarea
              defaultValue={fileDescription || ""}
              name="fileDescription"
              className="resize-none"
              rows={5}
            ></textarea>
          </div>
          <div className="mb-4">
            <label>File Size</label>
            <input
              defaultValue={fileSize || ""}
              name="fileSize"
              placeholder="Enter File Size..."
              type="text"
            />
          </div>
          <div className="mb-4">
            <label>File Type</label>
            <input
              defaultValue={fileType || ""}
              name="fileType"
              placeholder="Enter File Type..."
              type="text"
            />
          </div>
          <div className="mb-10">
            <label>File</label>
            <input
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
              accept="*"
              name="file"
              type={"file"}
            />
            {(fileId && previewUrl) && (
              <img
                className="h-48"
                alt="file preview"
                src={previewUrl || `${BASE_API_URL}/uploads/${fileId}`}
              />
            )}
          </div>
          <div className="flex items-center mb-5">
            <button className="w-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFile;
