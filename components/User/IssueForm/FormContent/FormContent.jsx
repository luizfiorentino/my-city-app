import styles from "./FormContent.module.css";
import FormHeader from "../../Shared/Fields/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle";
import FormInput from "../../Shared/Fields/FormInput";
import { IoMdAdd } from "react-icons/io";
export default function FormContent({
  errors,
  userRegister,
  descriptionRegister,
  locationRegister,
  fileRegister,
  previewSource,
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
        // value={userName}
        // onChange={(e) => setUserName(e.target.value)}
        error={errors.userName}
        register={userRegister}
        type="text"
        name="userName"
      />
      <FormInput
        label="Description"
        placeHolder="e.g. there is something..."
        // value={description}
        // onChange={(e) => setDescription(e.target.value)}
        error={errors.description}
        register={descriptionRegister}
        type="text"
        name="description"
      />
      <FormInput
        label="Location"
        placeHolder="e.g. Dijkstraat 123. Amsterdam"
        // value={location}
        // onChange={(e) => setLocation(e.target.value)}
        error={errors.location}
        register={locationRegister}
        type="text"
        name="location"
      />
      <div className={styles.uploadImage}>
        <label htmlFor="file">
          {" "}
          <FormSubtitle variant="sendPictureBanner">
            {previewSource
              ? "Choose another picture"
              : "Send a related picture"}{" "}
            <IoMdAdd />
          </FormSubtitle>
        </label>
        <input
          className={styles.hiddenInput}
          type="file"
          id="file"
          style={{ marginTop: "1rem" }}
          {...fileRegister}
        />
        {previewSource && (
          <img
            className={styles.imagePreview}
            src={previewSource}
            alt="chosen"
          />
        )}

        {errors.file && <span>{errors.file.message}</span>}
      </div>
    </div>
  );
}
