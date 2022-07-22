import React from "react";
import { useDropzone } from "react-dropzone";
import upload from "../images/upload.png";

export const FileDrop = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ maxFiles: 1, onDrop });
  return (
    <div {...getRootProps()} className="dropzon">
      <input {...getInputProps()} />
      <img src={upload} alt="uploadicon" />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};
