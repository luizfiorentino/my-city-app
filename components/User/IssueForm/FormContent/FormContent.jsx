import styles from "./FormContent.module.css";
import FormHeader from "../../Shared/Fields/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle";
import FormInput from "../../Shared/Fields/FormInput";
import { AiOutlineUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import ErrorMessage from "../../Shared/StatusMessage/StatusMessage";

export default function FormContent({
  errors,
  userRegister,
  descriptionRegister,
  locationRegister,
  previewSources,
  getRootProps,
  getInputProps,
  isDragActive,
  removeFile,
}) {
  return (
    <div className={styles.formContent}>
      <FormHeader>Reports data</FormHeader>
      <FormSubtitle>
        Please provide your name, description and location of the issue.
      </FormSubtitle>

      <FormInput
        label="Name"
        placeHolder="e.g. Mike Ness"
        error={errors.userName}
        register={userRegister}
        type="text"
        name="userName"
      />
      <FormInput
        label="Description"
        placeHolder="e.g. there is something..."
        error={errors.description}
        register={descriptionRegister}
        type="text"
        name="description"
      />
      <FormInput
        label="Location"
        placeHolder="e.g. Dijkstraat 123. Amsterdam"
        error={errors.location}
        register={locationRegister}
        type="text"
        name="location"
      />
      <FormInput label="Pictures (max. 3)" variant="photos" />
      <div
        className={
          !previewSources.length ? styles.hiddenInput : styles.uploadImage
        }
      >
        {previewSources &&
          previewSources.map((src, index) => (
            <div key={index} className={styles.imagePreviewContainer}>
              <img className={styles.imagePreview} src={src} alt="chosen" />
              <button
                className={styles.removeButton}
                //preventDefault avoids submitting the form before clicking the button
                onClick={(event) => {
                  event.preventDefault();
                  removeFile(index);
                }}
              >
                <BsTrash className={styles.deleteIcon} />
              </button>
            </div>
          ))}

        {errors.file && <ErrorMessage>{errors.file.message}</ErrorMessage>}
      </div>
      <div
        className={styles.dropzone}
        {...getRootProps}
        style={{ color: "black" }}
      >
        <input {...getInputProps} />
        {isDragActive ? (
          <FormSubtitle variant="dragDrop">Drop files here</FormSubtitle>
        ) : (
          <FormSubtitle variant="dragDrop">
            Drag n' drop files or click here
            <AiOutlineUpload className={styles.uploadIcon} />
          </FormSubtitle>
        )}
      </div>
    </div>
  );
}
