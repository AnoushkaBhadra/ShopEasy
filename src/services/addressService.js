import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_JSON_API;

export const getAddresses = async (userId) => {
    const res = await axios.get(
        `${API_URL}/addresses?userId=${userId}`
    );

    return res.data;
};

export const getAddress = async (addressId) => {
    const res = await axios.get(
        `${API_URL}/addresses/${addressId}`
    );

    return res.data;
};

export const addAddress = async (addressData) => {
    const res = await axios.post(
        `${API_URL}/addresses`,
        addressData
    );

    return res.data;
};

export const updateAddress = async (
    addressId,
    updatedData
) => {
    const res = await axios.patch(
        `${API_URL}/addresses/${addressId}`,
        updatedData
    );

    return res.data;
};

export const deleteAddress = async (addressId) => {
    await axios.delete(
        `${API_URL}/addresses/${addressId}`
    );
};