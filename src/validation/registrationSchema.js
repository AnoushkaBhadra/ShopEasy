import * as Yup from "yup";

export const registrationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});