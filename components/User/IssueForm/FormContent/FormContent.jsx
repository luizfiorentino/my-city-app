import styles from "./FormContent.module.css";
import FormHeader from "../../Shared/Fields/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle";
import FormInput from "../../Shared/Fields/FormInput";

export default function FormContent({
  errors,
  userRegister,
  descriptionRegister,
  locationRegister,
  previewSources,
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
      <div className={styles.uploadImage}>
        {previewSources &&
          previewSources.map((src, index) => {
            return (
              <img
                key={index}
                className={styles.imagePreview}
                src={src}
                alt="chosen"
              />
            );
          })}

        {errors.file && <span>{errors.file.message}</span>}
      </div>
    </div>
  );
}
