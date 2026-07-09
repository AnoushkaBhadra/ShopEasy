import { registrationSchema } from "./registrationSchema";

describe("registrationSchema", () => {
  const validRegistration = {
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  };

  it("validates a valid registration payload", async () => {
    // Verifies valid registration data passes schema validation.
    await expect(
      registrationSchema.validate(validRegistration)
    ).resolves.toEqual(validRegistration);
  });

  it("requires a name", async () => {
    // Verifies name is mandatory.
    await expect(
      registrationSchema.validate(
        { ...validRegistration, name: "" },
        { abortEarly: false }
      )
    ).rejects.toMatchObject({
      errors: expect.arrayContaining(["Name is required"]),
    });
  });

  it("rejects names shorter than three characters", async () => {
    // Verifies name must meet the minimum length.
    await expect(
      registrationSchema.validate({ ...validRegistration, name: "Al" })
    ).rejects.toThrow("Minimum 3 characters");
  });

  it("requires an email address", async () => {
    // Verifies email is mandatory.
    await expect(
      registrationSchema.validate({ ...validRegistration, email: "" })
    ).rejects.toThrow("Email is required");
  });

  it("rejects an invalid email address", async () => {
    // Verifies email must use a valid email format.
    await expect(
      registrationSchema.validate({
        ...validRegistration,
        email: "not-an-email",
      })
    ).rejects.toThrow("Enter a valid email");
  });

  it("requires a password", async () => {
    // Verifies password is mandatory.
    await expect(
      registrationSchema.validate(
        { ...validRegistration, password: "" },
        { abortEarly: false }
      )
    ).rejects.toMatchObject({
      errors: expect.arrayContaining(["Password is required"]),
    });
  });

  it("rejects passwords shorter than six characters", async () => {
    // Verifies password length protects against too-short values.
    await expect(
      registrationSchema.validate({
        ...validRegistration,
        password: "12345",
      })
    ).rejects.toThrow("Password must be at least 6 characters");
  });

  it("reports multiple validation errors when abortEarly is disabled", async () => {
    // Verifies callers can collect all field errors at once.
    await expect(
      registrationSchema.validate(
        { name: "", email: "", password: "" },
        { abortEarly: false }
      )
    ).rejects.toMatchObject({
      errors: expect.arrayContaining([
        "Name is required",
        "Email is required",
        "Password is required",
      ]),
    });
  });
});
