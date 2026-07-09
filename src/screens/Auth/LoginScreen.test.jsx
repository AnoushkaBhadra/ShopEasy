import React from "react";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useDispatch } from "react-redux";

import LoginScreen from "./LoginScreen";
import { login as loginUser } from "../../services/authService";
import { saveAuthData, getToken } from "../../utils/authStorage";
import {
  login,
  setLoading,
} from "../../store/slices/authSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../../services/authService", () => ({
  login: jest.fn(),
}));

jest.mock("../../utils/authStorage", () => ({
  saveAuthData: jest.fn(),
  getToken: jest.fn(),
}));

describe("LoginScreen", () => {
  const dispatch = jest.fn();
  const replace = jest.fn();
  const navigation = {
    navigate: jest.fn(),
    getParent: jest.fn(() => ({ replace })),
  };

  const user = {
    id: 1,
    name: "Test User",
    email: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
  });

  afterEach(() => {
    Alert.alert.mockRestore();
  });

  it("renders the login form", async () => {
    // Verifies the screen shows the expected login fields and action.
    const { getByText, getByPlaceholderText } = await render(
      <LoginScreen navigation={navigation} />
    );

    expect(getByText("Welcome Back")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
    expect(getByPlaceholderText("Enter your password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
  });

  it("shows validation errors for invalid submitted values", async () => {
    // Verifies Formik/Yup validation prevents an invalid login submit.
    const { getByText, findByText } = await render(
      <LoginScreen navigation={navigation} />
    );

    await fireEvent.press(getByText("Login"));

    expect(await findByText("Email is required")).toBeTruthy();
    expect(await findByText("Password is required")).toBeTruthy();
    expect(loginUser).not.toHaveBeenCalled();
  });

  it("logs in successfully, stores auth data, dispatches auth actions, and navigates", async () => {
    // Verifies the successful login workflow.
    loginUser.mockResolvedValueOnce({
      token: "auth-token",
      user,
    });
    saveAuthData.mockResolvedValueOnce();
    getToken.mockResolvedValueOnce("auth-token");

    const { getByText, getByPlaceholderText } = await render(
      <LoginScreen navigation={navigation} />
    );

    await fireEvent.changeText(
      getByPlaceholderText("Enter your email"),
      user.email
    );
    await fireEvent.changeText(
      getByPlaceholderText("Enter your password"),
      "123456"
    );
    await fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith(user.email, "123456");
      expect(saveAuthData).toHaveBeenCalledWith("auth-token", user);
      expect(dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(dispatch).toHaveBeenCalledWith(
        login({ user, token: "auth-token" })
      );
      expect(dispatch).toHaveBeenCalledWith(setLoading(false));
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Login successful"
      );
      expect(replace).toHaveBeenCalledWith("App");
    });
  });

  it("alerts when the login API fails", async () => {
    // Verifies API failures are surfaced to the user.
    loginUser.mockRejectedValueOnce(new Error("Invalid credentials"));

    const { getByText, getByPlaceholderText } = await render(
      <LoginScreen navigation={navigation} />
    );

    await fireEvent.changeText(
      getByPlaceholderText("Enter your email"),
      user.email
    );
    await fireEvent.changeText(
      getByPlaceholderText("Enter your password"),
      "wrong-password"
    );
    await fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Login Failed",
        "Invalid credentials"
      );
      expect(dispatch).toHaveBeenCalledWith(setLoading(false));
      expect(replace).not.toHaveBeenCalled();
    });
  });

  it("alerts when the token was not saved", async () => {
    // Verifies failed persistence prevents navigation.
    loginUser.mockResolvedValueOnce({
      token: "auth-token",
      user,
    });
    saveAuthData.mockResolvedValueOnce();
    getToken.mockResolvedValueOnce(null);

    const { getByText, getByPlaceholderText } = await render(
      <LoginScreen navigation={navigation} />
    );

    await fireEvent.changeText(
      getByPlaceholderText("Enter your email"),
      user.email
    );
    await fireEvent.changeText(
      getByPlaceholderText("Enter your password"),
      "123456"
    );
    await fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Login Failed",
        "Token not saved"
      );
      expect(replace).not.toHaveBeenCalled();
    });
  });

  it("navigates to registration from the footer link", async () => {
    // Verifies the sign-up link routes to the registration screen.
    const { getByText } = await render(
      <LoginScreen navigation={navigation} />
    );

    await fireEvent.press(getByText("Sign Up"));

    expect(navigation.navigate).toHaveBeenCalledWith("Registration");
  });
});
