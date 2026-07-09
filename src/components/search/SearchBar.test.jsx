import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import SearchBar from "./SearchBar";

jest.mock("@expo/vector-icons", () => ({
  Feather: ({ name }) => {
    const { Text } = require("react-native");
    return <Text>{name}</Text>;
  },
}));

describe("SearchBar", () => {
  it("renders the provided value and default placeholder", async () => {
    // Verifies the controlled input receives its value and default prompt.
    const { getByDisplayValue, getByPlaceholderText } = await render(
      <SearchBar value="phone" onChangeText={jest.fn()} />
    );

    await waitFor(() => {
      expect(getByDisplayValue("phone")).toBeTruthy();
      expect(getByPlaceholderText("Search products...")).toBeTruthy();
    });
  });

  it("renders a custom placeholder", async () => {
    // Verifies callers can override the search placeholder text.
    const { getByPlaceholderText } = await render(
      <SearchBar
        value=""
        onChangeText={jest.fn()}
        placeholder="Find items"
      />
    );

    await waitFor(() => {
      expect(getByPlaceholderText("Find items")).toBeTruthy();
    });
  });

  it("calls onChangeText when the user types", async () => {
    // Verifies text entry is forwarded to the parent callback.
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = await render(
      <SearchBar value="" onChangeText={onChangeText} />
    );

    await fireEvent.changeText(
      getByPlaceholderText("Search products..."),
      "speaker"
    );

    expect(onChangeText).toHaveBeenCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith("speaker");
  });
});
