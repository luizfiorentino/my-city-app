import styles from "./FormContent.module.css";
import FormHeader from "../../Shared/Fields/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle";
import FormInput from "../../Shared/Fields/FormInput";

export default function FormContent({
  errors,
  userRegister,
  descriptionRegister,
  locationRegister,
  register,
  handleFileInputChange,
  fileInputState,
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
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Send a related picture</label>
        <input
          type="file"
          {...register("file")}
          onChange={handleFileInputChange}
          style={{ marginTop: "1rem" }}
        />
        {/* <input
          type="file"
          name="file"
          ref={register("file")}
          onChange={handleFileInputChange}
          value={fileInputState}
          style={{ marginTop: "1rem" }}
        /> */}
        {errors.file && <span>{errors.file.message}</span>}
      </div>
    </div>
  );
}
