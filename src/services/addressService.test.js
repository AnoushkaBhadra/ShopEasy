import axios from "axios";

import {
  getAddresses,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
} from "./addressService";

jest.mock("axios");

describe("addressService", () => {
  const API_URL = process.env.EXPO_PUBLIC_JSON_API;

  const address = {
    id: 1,
    userId: 10,
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAddresses", () => {
    it("fetches addresses for a user id", async () => {
      // Verifies addresses are requested with the userId query parameter.
      axios.get.mockResolvedValueOnce({ data: [address] });

      await expect(getAddresses(address.userId)).resolves.toEqual([address]);

      expect(axios.get).toHaveBeenCalledWith(
        `${API_URL}/addresses?userId=${address.userId}`
      );
    });

    it("returns an empty array when the API has no addresses", async () => {
      // Verifies empty API responses are returned without modification.
      axios.get.mockResolvedValueOnce({ data: [] });

      await expect(getAddresses(address.userId)).resolves.toEqual([]);
    });

    it("rejects when fetching addresses fails", async () => {
      // Verifies failed address list requests propagate the API error.
      const error = new Error("Network error");
      axios.get.mockRejectedValueOnce(error);

      await expect(getAddresses(address.userId)).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("getAddress", () => {
    it("fetches a single address by id", async () => {
      // Verifies address detail requests use the address id path.
      axios.get.mockResolvedValueOnce({ data: address });

      await expect(getAddress(address.id)).resolves.toEqual(address);

      expect(axios.get).toHaveBeenCalledWith(
        `${API_URL}/addresses/${address.id}`
      );
    });

    it("rejects when the address id is invalid or not found", async () => {
      // Verifies invalid ids rely on the API rejection.
      const error = new Error("Address not found");
      axios.get.mockRejectedValueOnce(error);

      await expect(getAddress(999)).rejects.toThrow("Address not found");
      expect(axios.get).toHaveBeenCalledWith(`${API_URL}/addresses/999`);
    });
  });

  describe("addAddress", () => {
    it("posts a new address and returns the created address", async () => {
      // Verifies addAddress uses POST with the address payload.
      const newAddress = { ...address, id: undefined };
      const createdAddress = { ...address, id: 2 };
      axios.post.mockResolvedValueOnce({ data: createdAddress });

      await expect(addAddress(newAddress)).resolves.toEqual(createdAddress);

      expect(axios.post).toHaveBeenCalledWith(
        `${API_URL}/addresses`,
        newAddress
      );
    });

    it("rejects when required address data is missing", async () => {
      // Verifies missing data errors from the API are propagated.
      const error = new Error("Invalid address data");
      axios.post.mockRejectedValueOnce(error);

      await expect(addAddress({ userId: address.userId })).rejects.toThrow(
        "Invalid address data"
      );
    });
  });

  describe("updateAddress", () => {
    it("patches an address and returns the updated address", async () => {
      // Verifies updateAddress uses PATCH with the address id and payload.
      const updates = {
        city: "Mumbai",
        isDefault: false,
      };
      const updatedAddress = { ...address, ...updates };
      axios.patch.mockResolvedValueOnce({ data: updatedAddress });

      await expect(updateAddress(address.id, updates)).resolves.toEqual(
        updatedAddress
      );

      expect(axios.patch).toHaveBeenCalledWith(
        `${API_URL}/addresses/${address.id}`,
        updates
      );
    });

    it("rejects when updating an invalid address id fails", async () => {
      // Verifies invalid update ids rely on the API rejection.
      const error = new Error("Address not found");
      axios.patch.mockRejectedValueOnce(error);

      await expect(updateAddress(999, { city: "Mumbai" })).rejects.toThrow(
        "Address not found"
      );
      expect(axios.patch).toHaveBeenCalledWith(
        `${API_URL}/addresses/999`,
        { city: "Mumbai" }
      );
    });
  });

  describe("deleteAddress", () => {
    it("deletes an address by id", async () => {
      // Verifies deleteAddress uses DELETE with the address id path.
      axios.delete.mockResolvedValueOnce({});

      await expect(deleteAddress(address.id)).resolves.toBeUndefined();

      expect(axios.delete).toHaveBeenCalledWith(
        `${API_URL}/addresses/${address.id}`
      );
    });

    it("rejects when deleting an invalid address id fails", async () => {
      // Verifies invalid delete ids rely on the API rejection.
      const error = new Error("Address not found");
      axios.delete.mockRejectedValueOnce(error);

      await expect(deleteAddress(999)).rejects.toThrow("Address not found");
      expect(axios.delete).toHaveBeenCalledWith(
        `${API_URL}/addresses/999`
      );
    });
  });
});
