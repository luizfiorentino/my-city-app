import React, { useState } from "react";
import axios from "axios";
import styles from "./UserForm.module.css";
import FormContent from "../FormContent/FormContent";
import Footer from "../Footer/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function UserForm() {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const formSchema = z.object({
    userName: z
      .string()
      .min(2, "user name must have at least 2 characters")
      .max(255, "the provided user name contains too much characters"),
    description: z
      .string()
      .min(10, "description must have at least 10 characters")
      .max(255, "the provided description contains too much characters"),
    location: z
      .string()
      .min(8, "location must have at least 8 characters")
      .max(255, "the provided location contains too much characters"),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setValues,
    setValue,
  } = useForm({
    defaultValues: {
      userName: "",
      description: "",
      location: "",
    },
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const issueRequest = async () => {
    //event.preventDefault();
    try {
      const newIssue = await axios.post(`./api/issues`, {
        issue: {
          userName: userName,
          description: description,
          location: location,
        },
      });
      setUserName("");
      setDescription("");
      setLocation("");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.image}>{/* <img src={image.src} /> */}</div>

      <div className={styles.form}>
        <form onSubmit={issueRequest}>
          <FormContent
            userName={userName}
            userRegister={{ ...register("userName") }}
            setUserName={setUserName}
            description={description}
            descriptionRegister={{ ...register("description") }}
            setDescription={setDescription}
            location={location}
            locationRegister={{ ...register("location") }}
            setLocation={setLocation}
            errors={errors}
          />
          <Footer onClick={issueRequest} />
        </form>
      </div>
    </div>
  );
}
