import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

//SAVE JWT SESSIOn

export const saveAuthData = async(token, user) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};


//GET STORED TOKEN 
export const getToken = async() => {
    return await AsyncStorage.getItem(TOKEN_KEY);
}

//STORED USER OBJECT
export const getUser = async () => {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
}; 


//CLEAR SESSION ONCE USER LOGS OUT
export const clearAuth = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
};