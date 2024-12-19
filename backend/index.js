const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { error } = require("console");
require('dotenv').config()
console.log(process.env)
console.log(process.env.DB_PASSWORD)
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "file_management",
});

appendFile.get("/files", (req, res) => {
    const q = "SELECT * FROM files";
    db.query(q, (eer, data) => {
        if (err) {
            console.error(err);
            return res.json({ error: err.sqlMessage });
        }
        return res.json({ data });
    });
});

app.post("/files", (req, res) => {
    const q = `
      INSERT INTO files(fileId, fileName, filePath, fileSize, fileType, parentDirectoryId, createdAt)
      VALUES (?)`;
    const values = [...Object.values(req.body)];
    console.log("Insert values:", values);
    db.query(q, [values], (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ error: err.sqlMessage });
      }
      return res.json({ data });
    });
});
  

app.get("/files/:fileId", (req, res) => {
    const fileId = req.params.fileId;
    const q = "SELECT * FROM files WHERE fileId = ?";
    db.query(q, [fileId], (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ error: err.sqlMessage });
      }
      return res.json({ data });
    });
});
  

app.put("/files/:fileId", (req, res) => {
    const fileId = req.params.fileId;
    const data = req.body;
    const q = `
      UPDATE files 
      SET ${Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ")} 
      WHERE fileId = ?`;
    db.query(q, [...Object.values(data), fileId], (err, out) => {
      if (err) {
        console.error(err);
        return res.json({ error: err.message });
      }
      return res.json({ data: out });
    });
});
  

app.delete("/files/:fileId", (req, res) => {
    const fileId = req.params.fileId;
    const q = "DELETE FROM files WHERE fileId = ?";
    db.query(q, [fileId], (err, data) => {
      if (err) {
        console.error(err);
        return res.json({ error: err.sqlMessage });
      }
      return res.json({ data });
    });
});

app.listen(8081, () => {
    console.log("listening");
  });
