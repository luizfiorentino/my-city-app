import React from "react";
import styles from "./FormInput.module.css";
import StatusMessage from "../../StatusMessage/StatusMessage";
import { ubuntu } from "@/styles/fonts";

export default function FormInput({
  label,
  type,
  name,
  placeHolder,
  register,
  variant,
  error,
}) {
  return (
    <>
      <label className={styles.label}>{label}</label>{" "}
      <input
        type={type}
        name={name}
        placeholder={placeHolder}
        className={`${variant === "photos" ? styles.hidden : styles.input} ${
          ubuntu.className
        } ${styles["variant"]}`}
        {...register}
      />
      {error && <StatusMessage>{error.message}</StatusMessage>}
    </>
  );
}
