import React from "react";
import { Alert } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";

import AddressFormScreen from "./AddressFormScreen";
import {
  getAddress,
  addAddress,
  updateAddress,
} from "../../services/addressService";
import { clearLocation } from "../../store/slices/locationSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../services/addressService", () => ({
  getAddress: jest.fn(),
  addAddress: jest.fn(),
  updateAddress: jest.fn(),
}));

describe("AddressFormScreen", () => {
  const dispatch = jest.fn();
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };
  const user = {
    id: 10,
    name: "Test User",
  };
  const savedAddress = {
    id: 3,
    label: "Home",
    addressLine: "123 Main Street",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700001",
    country: "India",
    latitude: 22.5726,
    longitude: 88.3639,
    isDefault: true,
  };

  const setMockState = ({ authUser = user, location = {} } = {}) => {
    useSelector.mockImplementation((selector) =>
      selector({
        auth: { user: authUser },
        location: {
          latitude: null,
          longitude: null,
          ...location,
        },
      })
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatch);
    setMockState();
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
  });

  afterEach(() => {
    Alert.alert.mockRestore();
  });

  it("renders add-address mode and clears old map location on mount", async () => {
    // Verifies add mode title and initial location cleanup.
    const { getByText } = await render(
      <AddressFormScreen navigation={navigation} route={{ params: {} }} />
    );

    expect(getByText("Add Address")).toBeTruthy();
    expect(dispatch).toHaveBeenCalledWith(clearLocation());
  });

  it("shows validation errors for an empty submit", async () => {
    // Verifies required address fields are validated before saving.
    const { getByText, findByText } = await render(
      <AddressFormScreen navigation={navigation} route={{ params: {} }} />
    );

    await fireEvent.press(getByText("Save Address"));

    expect(await findByText("Label is required.")).toBeTruthy();
    expect(await findByText("Pincode is required.")).toBeTruthy();
    expect(addAddress).not.toHaveBeenCalled();
  });

  it("prefills latitude and longitude from Redux location", async () => {
    // Verifies selected map coordinates are reflected in the form.
    setMockState({
      location: {
        latitude: 22.5726,
        longitude: 88.3639,
      },
    });

    const { getByDisplayValue } = await render(
      <AddressFormScreen navigation={navigation} route={{ params: {} }} />
    );

    await waitFor(() => {
      expect(getByDisplayValue("22.5726")).toBeTruthy();
      expect(getByDisplayValue("88.3639")).toBeTruthy();
    });
  });

  it("adds a new address and navigates back", async () => {
    // Verifies create mode submits the expected address payload.
    setMockState({
      location: {
        latitude: 22.5726,
        longitude: 88.3639,
      },
    });
    addAddress.mockResolvedValueOnce(savedAddress);

    const { getByText, getAllByDisplayValue } = await render(
      <AddressFormScreen navigation={navigation} route={{ params: {} }} />
    );

    const emptyInputs = getAllByDisplayValue("");
    await fireEvent.changeText(emptyInputs[0], "Home");
    await fireEvent.changeText(emptyInputs[1], "123 Main Street");
    await fireEvent.changeText(emptyInputs[2], "Kolkata");
    await fireEvent.changeText(emptyInputs[3], "West Bengal");
    await fireEvent.changeText(emptyInputs[4], "700001");
    await fireEvent.changeText(emptyInputs[5], "India");
    await fireEvent.press(getByText("Save Address"));

    await waitFor(() => {
      expect(addAddress).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: user.id,
          label: "Home",
          latitude: 22.5726,
          longitude: 88.3639,
        })
      );
      expect(Alert.alert).toHaveBeenCalledWith("Success", "Address added.");
      expect(navigation.goBack).toHaveBeenCalled();
    });
  });

  it("loads and updates an existing address", async () => {
    // Verifies edit mode loads address data and PATCHes updates.
    getAddress.mockResolvedValueOnce(savedAddress);
    updateAddress.mockResolvedValueOnce({ ...savedAddress, city: "Mumbai" });

    const { getByText, getByDisplayValue } = await render(
      <AddressFormScreen
        navigation={navigation}
        route={{ params: { addressId: savedAddress.id } }}
      />
    );

    await waitFor(() => {
      expect(getByText("Edit Address")).toBeTruthy();
      expect(getByDisplayValue("Home")).toBeTruthy();
    });

    await fireEvent.changeText(getByDisplayValue("Kolkata"), "Mumbai");
    await fireEvent.press(getByText("Update Address"));

    await waitFor(() => {
      expect(updateAddress).toHaveBeenCalledWith(
        savedAddress.id,
        expect.objectContaining({
          city: "Mumbai",
          isDefault: true,
        })
      );
      expect(Alert.alert).toHaveBeenCalledWith("Success", "Address updated.");
    });
  });

  it("alerts when saving without a user", async () => {
    // Verifies address saving is blocked without authenticated user state.
    setMockState({
      authUser: null,
      location: {
        latitude: 22.5726,
        longitude: 88.3639,
      },
    });

    const { getByText, getAllByDisplayValue } = await render(
      <AddressFormScreen navigation={navigation} route={{ params: {} }} />
    );

    const emptyInputs = getAllByDisplayValue("");
    await fireEvent.changeText(emptyInputs[0], "Home");
    await fireEvent.changeText(emptyInputs[1], "123 Main Street");
    await fireEvent.changeText(emptyInputs[2], "Kolkata");
    await fireEvent.changeText(emptyInputs[3], "West Bengal");
    await fireEvent.changeText(emptyInputs[4], "700001");
    await fireEvent.changeText(emptyInputs[5], "India");
    await fireEvent.press(getByText("Save Address"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "User not found.");
      expect(addAddress).not.toHaveBeenCalled();
    });
  });

  it("navigates to map selection and clears location on cancel", async () => {
    // Verifies secondary address form actions are wired correctly.
    const { getByText } = await render(
      <AddressFormScreen navigation={navigation} route={{ params: {} }} />
    );

    await fireEvent.press(getByText("Pick Location on Map"));
    await fireEvent.press(getByText("Cancel"));

    expect(navigation.navigate).toHaveBeenCalledWith("MapSelection");
    expect(dispatch).toHaveBeenCalledWith(clearLocation());
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
