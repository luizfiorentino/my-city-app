import React, { useState } from "react";
import { useForm } from "react-hook-form";
import fetch from "isomorphic-unfetch";

function FormContent({ register, errors }) {
  console.log("REGISTER:::", { ...register("userName") });
  return (
    <div>
      <label>Name:</label>
      <input type="text" name="userName" {...register("userName")} />
      {errors.userName && <span>{errors.userName.message}</span>}

      <label>Description:</label>
      <input type="text" name="description" {...register("description")} />
      {errors.description && <span>{errors.description.message}</span>}

      <label>Location:</label>
      <input type="text" name="location" {...register("location")} />
      {errors.location && <span>{errors.location.message}</span>}
      <div>
        <label>File:</label>
        <input
          type="file"
          name="file"
          {...register("file", { required: "Please select a file" })}
        />
        {errors.file && <span>{errors.file.message}</span>}
      </div>
    </div>
  );
}

function FileUploadForm() {
  const [successRequest, setSuccessRequest] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("WHAT is data?", data);
    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("file", data.file[0]);

      console.log("NEWFORM", formData);

      const response = await fetch("/api/issues", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle success
        console.log("Form data submitted successfully");
        reset();
        setSuccessRequest(true);
      } else {
        // Handle error
        console.log("Failed to submit form data");
      }
    } catch (error) {
      // Handle error
      console.log(
        "An error occurred while submitting form data:",
        error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent register={register} errors={errors} />

      <div>
        <button type="submit">Upload</button>
      </div>
    </form>
  );
}

export default FileUploadForm;
