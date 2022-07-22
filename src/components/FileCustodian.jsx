import React from "react";
import file from "../images/file.png";
export const FileCustodian = ({ value, onChange, onClick, symbol, name }) => {
  return (
    <div className="custodian_wrapper">
      <div className="">
        <img src={file} alt={"fileIcon"} />
      </div>
      <div className="custodian_file_name"> {name}</div>
      <input
        className="custodian_input"
        type="text"
        placeholder="Enter Custodian Name"
        value={value}
        onChange={(e) => onChange(e, symbol)}
      ></input>

      <button className="custodian_button" onClick={() => onClick(symbol)}>
        Upload
      </button>
    </div>
  );
};
