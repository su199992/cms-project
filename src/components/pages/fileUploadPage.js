import React, { useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../components/auth/firebaseConfig";

import "./fileUploadPage.css";

const FileInfo = ({ uploadedInfo }) => (
  <ul className="preview_info">
    {Object.entries(uploadedInfo).map(([key, value]) => (
      <li key={key}>
        <span className="info_key">{key}</span>
        <span className="info_value">{value}</span>
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
    <label className={`preview${isActive ? " active" : ""}`} onDragEnter={handleDragStart} onDragOver={handleDragOver} onDragLeave={handleDragEnd} onDrop={handleDrop}>
      <input type="file" className="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadedInfo.map((info, index) => (
        <FileInfo key={index} uploadedInfo={info} />
      ))}
      <p>Progress:</p>
      <ul>
        {Object.entries(progress).map(([fileName, prog]) => (
          <li key={fileName}>
            {fileName}: {prog}%
          </li>
        ))}
      </ul>
      {!uploadedInfo.length && (
        <>
          <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
        </>
      )}
    </label>
  );
};

export default FileUploadPage;
