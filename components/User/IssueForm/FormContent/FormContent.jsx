import styles from "./FormContent.module.css";
import FormHeader from "../../Shared/Fields/FormHeader/FormHeader";
import FormSubtitle from "../../Shared/Fields/FormSubtitle/FormSubtitle";
import FormInput from "../../Shared/Fields/FormInput/FormInput";

export default function FormContent({
  errors,
  userRegister,
  descriptionRegister,
  locationRegister,
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
      />
      <FormInput
        label="Description"
        placeHolder="e.g. there is something..."
        // value={description}
        // onChange={(e) => setDescription(e.target.value)}
        error={errors.description}
        register={descriptionRegister}
      />
      <FormInput
        label="Location"
        placeHolder="e.g. Dijkstraat 123. Amsterdam"
        // value={location}
        // onChange={(e) => setLocation(e.target.value)}
        error={errors.location}
        register={locationRegister}
      />
    </div>
  );
}
