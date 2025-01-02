import React from "react";

const ToggleSetting = ({
  className,
  name,
  defaultChecked,
  value,
  onChange,
}) => {
  return (
    <div className={className}>
      <span>{name}</span>
      <label className="toggle-switch">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          value={value}
          onChange={onChange}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleSetting;
