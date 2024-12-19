import axios from "axios";

export const getFiles = async () => {
  try {
    const res = await axios.get("http://localhost:8081/files/");
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
