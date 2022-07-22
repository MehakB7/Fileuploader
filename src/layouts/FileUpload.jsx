import React, { useState, useCallback } from "react";
import { FileDrop } from "../components/FileDrop";
import { FileCustodian } from "../components/FileCustodian";
import FileProgress from "../components/FileProgress";
import { IsEmptyObject } from "../helpers/utilts";
import "./fileupload.css";

const FileUpload = () => {
  const [files, setFiles] = useState({});
  const [filesOnUpload, setFilesOnUpload] = useState([]);
  const onDrop = useCallback((acceptFile, rejectedFiles) => {
    setFiles((prev) =>
      acceptFile.reduce((old, file) => {
        // const  = getIconForType(file.type);
        return {
          ...old,
          [file.name]: {
            file,
            custodianName: "",
            name: file.name,
          },
        };
      }, prev)
    );
  }, []);

  const onSubmit = (key) => {
    let tempFile = { ...files };
    let file = tempFile[`${key}`];
    delete tempFile[`${key}`];
    setFiles(tempFile);
    setFilesOnUpload((prev) => [
      ...prev,
      { ...file, key: `${file.name}_${Date.now()}` },
    ]);
  };

  const onChange = (event, key) => {
    let tempFiles = { ...files };
    tempFiles[`${key}`].custodianName = event.target.value;
    setFiles(tempFiles);
  };

  const onDelete = (key) => {
    const filter = filesOnUpload.filter((item) => item.key !== key);
    setFilesOnUpload(filter);
  };

  return (
    <>
      <div className="fileUpload_wrapper">
        <div className="fileUpload_dropzone_wrapper">
          {IsEmptyObject(files) ? (
            <FileDrop onDrop={onDrop} />
          ) : (
            <div className="fileUpload_file_custodian">
              {Object.entries(files).map(([key, item], index) => (
                <FileCustodian
                  key={index}
                  onClick={onSubmit}
                  onChange={onChange}
                  value={item.custodianName}
                  symbol={key}
                  name={item.file.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="fileupload_notifications">
        <div className="fileupload_list">
          {filesOnUpload.map((item, index) => (
            <FileProgress key={item.key} fileInfo={item} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
