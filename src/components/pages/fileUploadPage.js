import { useState } from "react";
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
  const [isActive, setActive] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState(null);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + "mb";
    setUploadedInfo({ name, size, type }); // name, size, type 정보를 uploadedInfo에 저장
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const file = event.dataTransfer.files[0];
    setFileInfo(file);
  };

  const handleUpload = ({ target }) => {
    const file = target.files[0];
    setFileInfo(file);
  };

  return (
    <label className={`preview${isActive ? " active" : ""}`} onDragEnter={handleDragStart} onDragOver={handleDragOver} onDragLeave={handleDragEnd} onDrop={handleDrop}>
      <input type="file" className="file" onChange={handleUpload} />
      {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />}
      {!uploadedInfo && (
        <>
          <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
          <p className="preview_desc">파일당 최대 3MB</p>
        </>
      )}
    </label>
  );
};

export default FileUploadPage;
