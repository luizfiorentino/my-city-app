import React, { useContext } from "react";
import styles from "./StepOneForm.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ubuntu } from "@/styles/fonts";
import FormContent from "../FormContent";
import Footer from "../../Shared/Footer";
import IssueContext from "@/utils/IssueContext";

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
  const { setStepOneFormData, setSelectedStepForm } = useContext(IssueContext);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      description: "",
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
    <div>
      <div className={`${styles.main} ${ubuntu.className}`}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit(submitInfos)}>
            <FormContent
              userRegister={{ ...register("userName") }}
              descriptionRegister={{ ...register("description") }}
              emailRegister={{ ...register("email") }}
              errors={errors}
            />
            <Footer className={styles.footer}>{"Next"} </Footer>
          </form>
        </div>
      </div>
    </div>
  );
}
