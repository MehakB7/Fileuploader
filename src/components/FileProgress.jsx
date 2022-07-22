import React, { useEffect, useRef, useState } from "react";
import cancel from "../images/cancel.png";

const FileProgress = ({ fileInfo, onDelete }) => {
  const barRef = useRef(null);

  const tick = Math.round(fileInfo.file.size / 100);

  let timeout = useRef();
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev > 100) {
          timeout.current = setTimeout(() => onDelete(fileInfo.key), 1000);
          clearInterval(interval);
        }
        return prev + 1;
      });
    }, tick);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <div className="progessList">
      <div className="progress_item_x">{fileInfo.file.name}</div>
      <div className="progress progress_item_m">
        <div
          className="bar"
          ref={barRef}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="progress_item_x">
        {progress >= 100 ? "Done" : progress}
      </div>
      {progress >= 100 && (
        <img
          src={cancel}
          alt="cancel button"
          className="progessButton"
          onClick={() => onDelete(fileInfo.key)}
        />
      )}
    </div>
  );
};

export default FileProgress;
