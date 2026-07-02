import React, {useState} from "react";
import { View, Text, Button, Alert } from "react-native";

import { saveAuthData, getToken } from "../../utils/authStorage";

import { register} from "../../services/authService";
export default function RegistrationScreen({navigation}) {
    const[email, setEmail] = useState("");
    const[name, setName] = useState("");
    const[password, setPassword] = useState("");
    const[isRegistring, setIsRegistrating] = useState(false);

    const handleRegistration = async () => {
        console.log("REGISTRATION CLICKED")
        try {
            setIsRegistrating(true);
            //starting registration process
            const response = await register(name, email, password); 
            console.log(name, email, password);

            await saveAuthData(response.token, response.user);

            //verify the token
            const storedToken = await getToken(); 
            console.log("RESULT TOKEN:", response.token);
            console.log("TOKEN STORED:", storedToken);
            if (!storedToken) {
                throw new Error("Token not saved");
            }
            Alert.alert("Success", "User Registered"); 
            navigation.replace("App");
            console.log("REGISTRATION SUCCESSFULL");

        }
        catch(err) {
            Alert.alert("Registration Failed", err.message);
        }
        finally{
            setIsRegistrating(false);
        }

    }
}