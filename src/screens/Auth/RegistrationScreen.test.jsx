import React from "react";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import RegistrationScreen from "./RegistrationScreen";
import { register } from "../../services/authService";
import { saveAuthData, getToken } from "../../utils/authStorage";

jest.mock("../../services/authService", () => ({
  register: jest.fn(),
}));

jest.mock("../../utils/authStorage", () => ({
  saveAuthData: jest.fn(),
  getToken: jest.fn(),
}));

describe("RegistrationScreen", () => {
  const navigation = {
    navigate: jest.fn(),
    replace: jest.fn(),
  };

  const user = {
    id: 1,
    name: "Test User",
    email: "test@example.com",
  };

  const submitButtonText = (screen) =>
    screen.getAllByText("Create Account")[1];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
  });

  afterEach(() => {
    Alert.alert.mockRestore();
  });

  it("renders the registration form", async () => {
    // Verifies the screen shows registration fields and action.
    const { getAllByText, getByPlaceholderText } = await render(
      <RegistrationScreen navigation={navigation} />
    );

    expect(getAllByText("Create Account")).toHaveLength(2);
    expect(getByPlaceholderText("Enter your full name")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
    expect(getByPlaceholderText("Create a password")).toBeTruthy();
  });

  it("shows validation errors for invalid submitted values", async () => {
    // Verifies Formik/Yup validation blocks invalid registration data.
    const screen = await render(<RegistrationScreen navigation={navigation} />);

    await fireEvent.press(submitButtonText(screen));

    expect(await screen.findByText("Name is required")).toBeTruthy();
    expect(await screen.findByText("Email is required")).toBeTruthy();
    expect(await screen.findByText("Password is required")).toBeTruthy();
    expect(register).not.toHaveBeenCalled();
  });

  it("alerts when registration response does not include auth data", async () => {
    // Verifies the current auth service contract does not falsely navigate.
    register.mockResolvedValueOnce({
      message: "User registered successfully",
    });
    saveAuthData.mockResolvedValueOnce();
    getToken.mockResolvedValueOnce(null);

    const screen = await render(
      <RegistrationScreen navigation={navigation} />
    );

    await fireEvent.changeText(
      screen.getByPlaceholderText("Enter your full name"),
      user.name
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText("Enter your email"),
      user.email
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText("Create a password"),
      "123456"
    );
    await fireEvent.press(submitButtonText(screen));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith(user.name, user.email, "123456");
      expect(saveAuthData).toHaveBeenCalledWith(undefined, undefined);
      expect(Alert.alert).toHaveBeenCalledWith(
        "Registration Failed",
        "Token not saved"
      );
      expect(navigation.replace).not.toHaveBeenCalled();
    });
  });

  it("alerts when registration fails", async () => {
    // Verifies API failures are surfaced to the user.
    register.mockRejectedValueOnce(new Error("User already exists"));

    const screen = await render(
      <RegistrationScreen navigation={navigation} />
    );

    await fireEvent.changeText(
      screen.getByPlaceholderText("Enter your full name"),
      user.name
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText("Enter your email"),
      user.email
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText("Create a password"),
      "123456"
    );
    await fireEvent.press(submitButtonText(screen));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Registration Failed",
        "User already exists"
      );
      expect(navigation.replace).not.toHaveBeenCalled();
    });
  });

  it("alerts when no token is available after registration", async () => {
    // Verifies failed persistence prevents navigation.
    register.mockResolvedValueOnce({
      token: "auth-token",
      user,
    });
    saveAuthData.mockResolvedValueOnce();
    getToken.mockResolvedValueOnce(null);

    const screen = await render(
      <RegistrationScreen navigation={navigation} />
    );

    await fireEvent.changeText(
      screen.getByPlaceholderText("Enter your full name"),
      user.name
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText("Enter your email"),
      user.email
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText("Create a password"),
      "123456"
    );
    await fireEvent.press(submitButtonText(screen));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Registration Failed",
        "Token not saved"
      );
      expect(navigation.replace).not.toHaveBeenCalled();
    });
  });

  it("navigates back to login from the footer link", async () => {
    // Verifies the login link routes to the login screen.
    const { getByText } = await render(
      <RegistrationScreen navigation={navigation} />
    );

    await fireEvent.press(getByText("Login"));

    expect(navigation.navigate).toHaveBeenCalledWith("Login");
  });
});
