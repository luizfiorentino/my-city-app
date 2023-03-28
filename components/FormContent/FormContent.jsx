import styles from "./FormContent.module.css";
import FormHeader from "../FormHeader/FormHeader";
import FormSubtitle from "../FormSubtitle/FormSubtitle";
import FormInput from "../FormInput/FormInput";

export default function FormContent({
  userName,
  setUserName,
  description,
  setDescription,
  location,
  setLocation,
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
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <FormInput
        label="Description"
        placeHolder="e.g. there is something..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormInput
        label="Location"
        placeHolder="e.g. Dijkstraat 123. Amsterdam"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  );
}
