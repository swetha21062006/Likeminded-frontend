import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  const buttonClass = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
