import React from "react";

const Button = (props) => {
  const { type, onClick, children, disabled = false, className = "" } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
