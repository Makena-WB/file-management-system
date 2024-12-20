import axios from "axios";

export const getFiles = async () => {
  try {
    const res = await axios.get("http://localhost:8081/files/");
    console.log("Files:", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getFileById = async (id) => {
  try {
    const res = await axios.get("http://localhost:8081/files/" + id);
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const addFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // The file to upload
  
      const res = await axios.post("http://localhost:8081/files/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return res.data;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  };
  

export const updateFile = async (file, fileId) => {
  try {
    const res = await axios.put(
      "http://localhost:8081/files/" + fileId,
      file
    );
    return res.data;
  } catch (err) {
    return {
      error: err,
    };
  }
};

export const deleteFile = async (fileId) => {
  try {
    const res = await axios.delete("http://localhost:8081/files/" + fileId);
    return res.data;
  } catch (err) {
    return { error: err };
  }
};

export const getDirectories = async () => {
  try {
    const res = await axios.get("http://localhost:8081/directories/123");
    console.log("Directories:", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getDirectoryById = async (id) => {
  try {
    const res = await axios.get("http://localhost:8081/directories/123" + id);
    return res.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const addDirectory = async (directory) => {
  try {
    const res = await axios.post("http://localhost:8081/directories/123", directory);
    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const updateDirectory = async (directoryId, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:8081/directories/${directoryId}`, updatedData);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};


export const deleteDirectory = async (directoryId) => {
  try {
    const res = await axios.delete("http://localhost:8081/directories/123" + directoryId);
    return res.data;
  } catch (err) {
    return { error: err };
  }
};
