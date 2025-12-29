import React from "react";
import styles from "./FormInput.module.css";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  ...props
}) => {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.error : ""}`}
        required={required}
        {...props}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default FormInput;
