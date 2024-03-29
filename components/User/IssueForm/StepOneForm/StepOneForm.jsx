import React, { useContext } from "react";
import styles from "./StepOneForm.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ubuntu } from "@/styles/fonts";
import Footer from "../../Shared/Footer";
import IssueContext from "@/utils/IssueContext";
import FormWrapper from "../FormContent/FormWrapper";
import FormInput from "../../Shared/Fields/FormInput/FormInput";
import ConfirmationMessage from "../ConfirmationMessage";

const formSchema = z.object({
  userName: z
    .string()
    .min(2, "user name must be at least 2 characters long")
    .max(255, "the provided user name contains too much characters"),
  description: z
    .string()
    .min(10, "description must be at least 10 characters long")
    .max(255, "the provided description contains too much characters"),
  email: z
    .string()
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Please provide a valid email address or leave it empty",
      }
    ),
});

export default function StepOneForm() {
  const { stepOneFormData, setStepOneFormData, setSelectedStepForm } =
    useContext(IssueContext);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      userName: stepOneFormData.userName ? stepOneFormData.userName : "",
      email: stepOneFormData.email ? stepOneFormData.email : "",
      description: stepOneFormData.description
        ? stepOneFormData.description
        : "",
    },
    // mode: "all", --> don't use, it's users unfriendly
    resolver: zodResolver(formSchema),
  });

  const submitInfos = (data) => {
    setStepOneFormData({
      userName: data.userName,
      email: data.email,
      description: data.description,
    });
    reset();
    setSelectedStepForm("LOCATION");
  };

  return (
    <div className={styles.formWrapper}>
      <div className={`${ubuntu.className}`}>
        <ConfirmationMessage
          title="Report's Data"
          subtitle="Please provide your name, email and description of the issue.
"
          variant="largeFont"
        ></ConfirmationMessage>
        <div className={` ${styles.formContent}`}>
          <FormWrapper>
            <FormInput
              label="Name"
              placeHolder="e.g. Mike Ness"
              error={errors.userName}
              register={{ ...register("userName") }}
              type="text"
              name="userName"
            />
            <FormInput
              label="Email (optional, to get folow ups)"
              placeHolder="e.g. mike@ness.com"
              error={errors.email}
              register={{ ...register("email") }}
              type="text"
              name="userName"
            />
            <FormInput
              label="Description"
              placeHolder="e.g. there is something..."
              error={errors.description}
              register={{ ...register("description") }}
              type="text"
              name="description"
            />
          </FormWrapper>
        </div>
        <Footer goBack={null} goForward={handleSubmit(submitInfos)}>
          {"Next"}
        </Footer>
      </div>
    </div>
  );
}

//Obs. how to export the Zod register to another component:
// userRegister={{ ...register("userName") }}
// descriptionRegister={{ ...register("description") }}
// emailRegister={{ ...register("email") }}
// errors={errors} */}
