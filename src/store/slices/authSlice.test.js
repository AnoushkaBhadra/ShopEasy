import authReducer, {
  login,
  logout,
  setLoading,
  restoreSection,
} from "./authSlice";

describe("authSlice", () => {
  const user = {
    id: 1,
    name: "Test User",
    email: "test@example.com",
  };

  const authenticatedState = {
    user,
    token: "auth-token",
    isAuthenticated: true,
    loading: false,
  };

  it("returns the initial state when called with an unknown action", () => {
    // Verifies the reducer exposes the expected signed-out defaults.
    expect(authReducer(undefined, { type: "unknown" })).toEqual({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
  });

  describe("login", () => {
    it("stores user and token data and marks the user authenticated", () => {
      // Verifies successful login populates auth state.
      const state = authReducer(
        undefined,
        login({ user, token: "auth-token" })
      );

      expect(state).toEqual(authenticatedState);
    });

    it("clears loading when login succeeds", () => {
      // Verifies a pending login is no longer loading after success.
      const initialState = {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: true,
      };

      const state = authReducer(
        initialState,
        login({ user, token: "auth-token" })
      );

      expect(state.loading).toBe(false);
    });
  });

  describe("logout", () => {
    it("clears user and token data and marks the user unauthenticated", () => {
      // Verifies logout restores signed-out auth values.
      const state = authReducer(authenticatedState, logout());

      expect(state).toEqual({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
    });

    it("clears loading even if logout happens while loading", () => {
      // Verifies logout leaves no pending auth operation.
      const initialState = {
        ...authenticatedState,
        loading: true,
      };

      const state = authReducer(initialState, logout());

      expect(state.loading).toBe(false);
    });
  });

  describe("setLoading", () => {
    it("sets loading to true", () => {
      // Verifies loading can be enabled for async auth work.
      const state = authReducer(undefined, setLoading(true));

      expect(state.loading).toBe(true);
    });

    it("sets loading to false", () => {
      // Verifies loading can be disabled after async auth work.
      const initialState = {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: true,
      };

      const state = authReducer(initialState, setLoading(false));

      expect(state.loading).toBe(false);
    });
  });

  describe("restoreSection", () => {
    it("restores a persisted user and token as authenticated", () => {
      // Verifies a saved token rehydrates an authenticated session.
      const state = authReducer(
        undefined,
        restoreSection({ user, token: "auth-token" })
      );

      expect(state.user).toEqual(user);
      expect(state.token).toBe("auth-token");
      expect(state.isAuthenticated).toBe(true);
    });

    it("restores user data without authenticating when token is missing", () => {
      // Verifies the token controls restored authentication status.
      const state = authReducer(
        authenticatedState,
        restoreSection({ user, token: null })
      );

      expect(state.user).toEqual(user);
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });
});
