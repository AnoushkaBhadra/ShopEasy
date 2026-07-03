import axios from "axios";

// Express auth server
const API_URL = process.env.EXPO_PUBLIC_AUTH_API;
console.log("AUTH API:", API_URL);
console.log("HITTING BACKEND");

export const login = async (email, password) => {
    console.log("HIT LOGIN API");

    const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
    });

    console.log("RAW RESPONSE:", res.data);

    return {
        token: res.data.token,
        user: {
            id: res.data.user.id,
            email: res.data.user.email,
            name: res.data.user.name,
        },
    };
};

export const register = async (name, email, password) => {
    const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
    });

    return {
        message: res.data.message,
    };
};

export const logout = async () => {
    return true;
};