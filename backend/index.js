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
  authPlugin: 'mysql_native_password',
});

const ensurePredefinedDirectories = async () => {
  const predefinedDirs = [
    { directoryId: "root", directoryName: "Root", parentDirectoryId: null },
    { directoryId: "uploads", directoryName: "Uploads", parentDirectoryId: null },
  ];

  for (const dir of predefinedDirs) {
    const checkQuery = "SELECT * FROM directories WHERE directoryId = ?";
    const insertQuery = `
      INSERT INTO directories (directoryId, directoryName, parentDirectoryId, createdAt)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `;

    db.query(checkQuery, [dir.directoryId], (err, result) => {
      if (err) {
        console.error("Error checking predefined directories:", err);
        return;
      }

      if (result.length === 0) {
        // Insert predefined directory if it doesn't exist
        db.query(insertQuery, [dir.directoryId, dir.directoryName, dir.parentDirectoryId], (insertErr) => {
          if (insertErr) console.error("Error inserting predefined directory:", insertErr);
        });
      }
    });
  }
};

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");

  // Ensure predefined directories exist after the DB connection is established
  ensurePredefinedDirectories();
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      console.log(req.body, "in");
      cb(null, `${req.body.productId}${path.extname(file.originalname)}`);
    },
});
  
const upload = multer({ storage: storage });
  
const app = express();
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname ,'uploads')));

app.get("/files", (req, res) => {
    const q = "SELECT * FROM files";
    db.query(q, (err, data) => {
        console.log(err, data);
        if (err) return res.json({ error: err.sqlMessage });
        else return res.json({ data });
      });
    });

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const q = `
      INSERT INTO files (fileName, filePath, fileSize, fileType, parentDirectoryId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    req.body.fileName,
    req.body.filePath,
    req.body.fileSize,
    req.body.fileType,
    req.body.parentDirectoryId,
    new Date(),
    new Date(),
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);  
    return res.json(data);
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
      return res.status(200).json({ data });
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

app.post("/directories/:directoryId", (req, res) => {
  const { directoryName, parentDirectory } = req.body;
  const q = `
    INSERT INTO directories (directoryName, parentDirectoryId, createdAt)
    VALUES (?, ?, CURRENT_TIMESTAMP)
  `;

  db.query(q, [directoryName, parentDirectory || null], (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    return res.status(201).json({ data });
  });
});


app.get("/directories/:directoryId", (req, res) => {
  const directoryId = req.params.directoryId;

  // Query to get directories from the database
  const q = "SELECT * FROM directories WHERE directoryId = ?";
  db.query(q, [directoryId], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ error: err.sqlMessage });
    }

    // Add predefined directories
    const predefinedDirs = [
      { directoryId: "root", directoryName: "Root", parentDirectoryId: null },
      { directoryId: "uploads", directoryName: "Uploads", parentDirectoryId: "root" }
    ];

    // Combine predefined directories with database result
    const allDirectories = [...predefinedDirs, ...data];

    return res.status(200).json({ data: allDirectories });
  });
});



app.get("/directories", (req, res) => {
  // Query to get all directories from the database
  const q = "SELECT * FROM directories";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ error: err.sqlMessage });
    }

    // Add predefined directories
    const predefinedDirs = [
      { directoryId: "root", directoryName: "Root", parentDirectoryId: null },
      { directoryId: "uploads", directoryName: "Uploads", parentDirectoryId: "root" }
    ];

    // Combine predefined directories with database result
    const allDirectories = [...predefinedDirs, ...data];

    return res.status(200).json({ data: allDirectories });
  });
});



app.put("/directories/:directoryId", (req, res) => {
  const directoryId = req.params.directoryId;
  const { directoryName, parentDirectory } = req.body;
  const q = `
    UPDATE directories 
    SET directoryName = ?, parentDirectory = ?, updatedAt = CURRENT_TIMESTAMP 
    WHERE directoryId = ?
  `;

  db.query(q, [directoryName, parentDirectory || null, directoryId], (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    return res.status(200).json({ data });
  });
});


app.delete("/directories/:directoryId", (req, res) => {
  const directoryId = req.params.directoryId;
  const q = "DELETE FROM directories WHERE directoryId = ?";
  db.query(q, [directoryId], (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    return res.status(200).json({ data });
  });
});

app.listen(8081, () => {
    console.log("listening");
  });
