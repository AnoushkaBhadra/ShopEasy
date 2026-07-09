import { loginSchema } from "./loginSchema";

describe("loginSchema", () => {
  const validLogin = {
    email: "test@example.com",
    password: "123456",
  };

  it("validates a valid login payload", async () => {
    // Verifies valid credentials pass schema validation.
    await expect(loginSchema.validate(validLogin)).resolves.toEqual(
      validLogin
    );
  });

  it("requires an email address", async () => {
    // Verifies email is mandatory.
    await expect(
      loginSchema.validate({ ...validLogin, email: "" })
    ).rejects.toThrow("Email is required");
  });

  it("rejects an invalid email address", async () => {
    // Verifies email must use a valid email format.
    await expect(
      loginSchema.validate({ ...validLogin, email: "not-an-email" })
    ).rejects.toThrow("Enter a valid email");
  });

  it("requires a password", async () => {
    // Verifies password is mandatory.
    await expect(
      loginSchema.validate(
        { ...validLogin, password: "" },
        { abortEarly: false }
      )
    ).rejects.toMatchObject({
      errors: expect.arrayContaining(["Password is required"]),
    });
  });

  it("rejects passwords shorter than six characters", async () => {
    // Verifies password length protects against too-short values.
    await expect(
      loginSchema.validate({ ...validLogin, password: "12345" })
    ).rejects.toThrow("Password must be at least 6 characters");
  });

  it("reports multiple validation errors when abortEarly is disabled", async () => {
    // Verifies callers can collect all field errors at once.
    await expect(
      loginSchema.validate(
        { email: "", password: "" },
        { abortEarly: false }
      )
    ).rejects.toMatchObject({
      errors: expect.arrayContaining([
        "Email is required",
        "Password is required",
      ]),
    });
  });
});
