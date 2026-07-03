import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_JSON_API;

export const getProfile = async (userId) => {
    const res = await axios.get(`${API_URL}/users/${userId}`);
    return res.data;
};

export const updateProfile = async (userId, updatedData) => {
    const res = await axios.patch(
        `${API_URL}/users/${userId}`,
        updatedData
    );

    return res.data;
};