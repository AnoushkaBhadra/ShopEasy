import axios from "axios";

import {
  getProfile,
  updateProfile,
} from "./profileService";

jest.mock("axios");

describe("profileService", () => {
  const API_URL = process.env.EXPO_PUBLIC_JSON_API;

  const profile = {
    id: 10,
    name: "Test User",
    email: "test@example.com",
    phone: "9876543210",
    profileImage: "https://example.com/avatar.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfile", () => {
    it("fetches a profile by user id", async () => {
      // Verifies profile requests use the user id path.
      axios.get.mockResolvedValueOnce({ data: profile });

      await expect(getProfile(profile.id)).resolves.toEqual(profile);

      expect(axios.get).toHaveBeenCalledWith(
        `${API_URL}/users/${profile.id}`
      );
    });

    it("returns missing profile data exactly as provided by the API", async () => {
      // Verifies sparse API data is not transformed by the service.
      const incompleteProfile = {
        id: profile.id,
        email: profile.email,
      };
      axios.get.mockResolvedValueOnce({ data: incompleteProfile });

      await expect(getProfile(profile.id)).resolves.toEqual(
        incompleteProfile
      );
    });

    it("rejects when the user id is invalid or not found", async () => {
      // Verifies invalid ids rely on the API rejection.
      const error = new Error("User not found");
      axios.get.mockRejectedValueOnce(error);

      await expect(getProfile(999)).rejects.toThrow("User not found");
      expect(axios.get).toHaveBeenCalledWith(`${API_URL}/users/999`);
    });
  });

  describe("updateProfile", () => {
    it("patches a profile and returns the updated profile", async () => {
      // Verifies updateProfile uses PATCH with the user id and payload.
      const updates = {
        name: "Updated User",
        phone: "9000000000",
        profileImage: "file:///avatar.png",
      };
      const updatedProfile = { ...profile, ...updates };
      axios.patch.mockResolvedValueOnce({ data: updatedProfile });

      await expect(updateProfile(profile.id, updates)).resolves.toEqual(
        updatedProfile
      );

      expect(axios.patch).toHaveBeenCalledWith(
        `${API_URL}/users/${profile.id}`,
        updates
      );
    });

    it("allows an empty update payload and returns the API response", async () => {
      // Verifies the service forwards even an empty payload unchanged.
      axios.patch.mockResolvedValueOnce({ data: profile });

      await expect(updateProfile(profile.id, {})).resolves.toEqual(profile);

      expect(axios.patch).toHaveBeenCalledWith(
        `${API_URL}/users/${profile.id}`,
        {}
      );
    });

    it("rejects when updating an invalid user id fails", async () => {
      // Verifies invalid update ids rely on the API rejection.
      const error = new Error("User not found");
      axios.patch.mockRejectedValueOnce(error);

      await expect(updateProfile(999, { name: "Updated" })).rejects.toThrow(
        "User not found"
      );
      expect(axios.patch).toHaveBeenCalledWith(
        `${API_URL}/users/999`,
        { name: "Updated" }
      );
    });
  });
});
