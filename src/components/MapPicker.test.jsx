import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import MapPicker from "./MapPicker";

let mockNextWebViewMessage = JSON.stringify({
  latitude: 22.5726,
  longitude: 88.3639,
});

jest.mock("react-native-webview", () => ({
  WebView: ({ onMessage, ...props }) => {
    const { Pressable } = require("react-native");
    return (
      <Pressable
        testID="map-webview"
        onPress={() =>
          onMessage({
            nativeEvent: {
              data: mockNextWebViewMessage,
            },
          })
        }
        {...props}
      />
    );
  },
}));

describe("MapPicker", () => {
  beforeEach(() => {
    mockNextWebViewMessage = JSON.stringify({
      latitude: 22.5726,
      longitude: 88.3639,
    });
  });

  it("renders the map WebView with expected settings", async () => {
    // Verifies the embedded map is configured for JavaScript messages.
    const { getByTestId } = await render(
      <MapPicker onLocationSelected={jest.fn()} />
    );

    await waitFor(() => {
      const webView = getByTestId("map-webview");

      expect(webView.props.originWhitelist).toEqual(["*"]);
      expect(webView.props.javaScriptEnabled).toBe(true);
      expect(webView.props.domStorageEnabled).toBe(true);
      expect(webView.props.mixedContentMode).toBe("always");
      expect(webView.props.source.html).toContain("OpenStreetMap");
    });
  });

  it("calls onLocationSelected with parsed coordinates from a WebView message", async () => {
    // Verifies map messages are parsed and forwarded to the parent.
    const onLocationSelected = jest.fn();
    const { getByTestId } = await render(
      <MapPicker onLocationSelected={onLocationSelected} />
    );

    await fireEvent.press(getByTestId("map-webview"));

    expect(onLocationSelected).toHaveBeenCalledTimes(1);
    expect(onLocationSelected).toHaveBeenCalledWith({
      latitude: 22.5726,
      longitude: 88.3639,
    });
  });

  it("handles a valid WebView message when no callback is provided", async () => {
    // Verifies the component is safe when onLocationSelected is omitted.
    const { getByTestId } = await render(<MapPicker />);

    await expect(
      fireEvent.press(getByTestId("map-webview"))
    ).resolves.toBeUndefined();
  });

  it("throws when the WebView sends malformed JSON", async () => {
    // Verifies malformed device messages currently surface a parse error.
    mockNextWebViewMessage = "not-json";

    const { getByTestId } = await render(
      <MapPicker onLocationSelected={jest.fn()} />
    );

    await expect(
      fireEvent.press(getByTestId("map-webview"))
    ).rejects.toThrow();
  });
});
