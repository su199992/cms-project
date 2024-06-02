import React, { useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../components/auth/firebaseConfig";
import { Container, Box, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CircularProgressWithLabel from "../../hooks/CircularProgressWithLabel";

import "./fileUploadPage.css";

const FileInfo = ({ uploadedInfo, progress }) => (
  <ul className="preview_info">
    {uploadedInfo.map((file, index) => (
      <li key={index} className="file_info_item">
        <Box display="flex" alignItems="center">
          <span className="info_key">{file.name}</span>

          <CircularProgressWithLabel value={progress[file.name] || 0} />
        </Box>

        <span className="info_value">{file.size}</span>
      </li>
    ))}
  </ul>
);

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [isActive, setActive] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState([]);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const setFileInfo = (files) => {
    const fileInfo = Array.from(files).map((file) => {
      const { name, size: byteSize, type } = file;
      const size = (byteSize / (1024 * 1024)).toFixed(2) + " MB";
      return { name, size, type };
    });

    setUploadedInfo(fileInfo);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const files = Array.from(event.dataTransfer.files); // Array로 변환
    setFiles(files);
    setFileInfo(files);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Array로 변환
    setFiles(selectedFiles);
    setFileInfo(selectedFiles);
  };

  const handleUpload = () => {
    const newProgress = {};

    files.forEach((file) => {
      const storageRef = ref(storage, `Image/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",

        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          newProgress[file.name] = progress;
          setProgress((prevProgress) => ({ ...prevProgress, ...newProgress }));
        },

        (error) => {
          console.error("Upload failed", error);
        }
      );
    });
  };

  return (
    <Container sx={{ display: "flex" }}>
      <Box>
        <label
          className={`preview${isActive ? " active" : ""}`}
          onDragEnter={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragEnd}
          onDrop={handleDrop}>
          <input type="file" className="file" multiple onChange={handleFileChange} />
          <UploadIcon sx={{ fontSize: 80 }} />
          <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
        </label>
      </Box>
      <Box sx={{ width: "300px", border: "2px solid #9A9899", borderRadius: "5px" }}>
        {uploadedInfo.length > 0 && <FileInfo uploadedInfo={uploadedInfo} progress={progress} />}
        <Button variant="contained" onClick={handleUpload} sx={{ margin: "10px 0" }}>
          Upload
        </Button>
      </Box>
    </Container>
  );
};

export default FileUploadPage;
