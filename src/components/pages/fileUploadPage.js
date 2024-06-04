import React, { useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../components/auth/firebaseConfig";
import { Container, Box, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgressWithLabel from "../../hooks/LinearProgressWithLabel";

import "./fileUploadPage.css";

const FileInfo = ({ uploadedInfo, progress, onRemove }) => (
  <ul className="preview_info">
    {uploadedInfo.map((file, index) => (
      <li key={index} className="file_info_item">
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingRight="10px">
          <Box display="flex" alignItems="center" width="90%">
            <span className="info_key">{file.name}</span>
            <span className="info_value" style={{ marginLeft: "auto", marginRight: "10px" }}>
              {file.size}
            </span>
            <Button onClick={() => onRemove(index)} sx={{ color: "#9A9899", padding: 0, minWidth: "24px" }}>
              <CloseIcon fontSize="8px" />
            </Button>
          </Box>
        </Box>
        <LinearProgressWithLabel value={progress[file.name] || 0} />
      </li>
    ))}
  </ul>
);

const FileUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState([]);

  const handleDragStart = () => setIsActive(true);
  const handleDragEnd = () => setIsActive(false);
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
    setIsActive(false);

    const droppedFiles = Array.from(event.dataTransfer.files); // 파일을 Array로 변환
    setFiles(droppedFiles);
    setFileInfo(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // 파일을 Array로 변환
    setFiles(selectedFiles);
    setFileInfo(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setFileInfo(newFiles);
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 115px)",
        border: "2px soild #9A9899",
      }}>
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
      <Box
        sx={{
          width: "350px",
          height: "450px",
          borderTop: "2px solid #9A9899",
          borderBottom: "2px solid #9A9899",
          padding: "15px",
          overflowY: "scroll",
          overflowX: "hidden",
        }}>
        <Button variant="contained" onClick={handleUpload} sx={{ margin: "10px 0" }}>
          Upload
        </Button>
        {uploadedInfo.length > 0 && <FileInfo uploadedInfo={uploadedInfo} progress={progress} onRemove={handleRemoveFile} />}
      </Box>
    </Container>
  );
};

export default FileUploadPage;
