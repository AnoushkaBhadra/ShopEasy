import locationReducer, {
  setLocation,
  clearLocation,
} from "./locationSlice";

describe("locationSlice", () => {
  it("returns the initial state when called with an unknown action", () => {
    // Verifies the reducer exposes empty coordinate defaults.
    expect(locationReducer(undefined, { type: "unknown" })).toEqual({
      latitude: null,
      longitude: null,
    });
  });

  describe("setLocation", () => {
    it("stores latitude and longitude values", () => {
      // Verifies selected map coordinates are saved in state.
      const state = locationReducer(
        undefined,
        setLocation({ latitude: 22.5726, longitude: 88.3639 })
      );

      expect(state).toEqual({
        latitude: 22.5726,
        longitude: 88.3639,
      });
    });

    it("replaces an existing location", () => {
      // Verifies a later map selection overwrites previous coordinates.
      const initialState = {
        latitude: 12.9716,
        longitude: 77.5946,
      };

      const state = locationReducer(
        initialState,
        setLocation({ latitude: 19.076, longitude: 72.8777 })
      );

      expect(state).toEqual({
        latitude: 19.076,
        longitude: 72.8777,
      });
    });
  });

  describe("clearLocation", () => {
    it("clears existing coordinates", () => {
      // Verifies location state can be reset after address work.
      const initialState = {
        latitude: 22.5726,
        longitude: 88.3639,
      };

      const state = locationReducer(initialState, clearLocation());

      expect(state).toEqual({
        latitude: null,
        longitude: null,
      });
    });

    it("keeps an already empty location empty", () => {
      // Verifies clearLocation is safe to call on initial state.
      const state = locationReducer(undefined, clearLocation());

      expect(state).toEqual({
        latitude: null,
        longitude: null,
      });
    });
  });
});
