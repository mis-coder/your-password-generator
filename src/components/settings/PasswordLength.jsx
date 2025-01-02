import React from "react";

const PasswordLength = ({ value, onChange }) => {
  return (
    <div className="length">
      <div className="length-label">
        <span>Length</span>
        <span>{value}</span>
      </div>
      <input value={value} onChange={onChange} type="range" min={1} max={30} />
    </div>
  );
};

export default PasswordLength;
