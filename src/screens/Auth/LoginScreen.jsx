import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

import { login } from "../../services/authService";
import { saveAuthData, getToken } from "../../utils/authStorage";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);

            const result = await login(email, password);

            await saveAuthData(result.token, result.user);

            const storedToken = await getToken();

            console.log("RESULT TOKEN:", result.token);
            console.log("TOKEN STORED:", storedToken);

            if (!storedToken) {
                throw new Error("Token not saved");
            }

            Alert.alert("Success", "Login successful");

            //navigation.replace("AppDrawer");
            

            console.log("LOGIN SUCCESSFUL");
        } catch (err) {
            Alert.alert("Login Failed", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Email</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ borderWidth: 1, marginBottom: 10 }}
            />

            <Text>Password</Text>

            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10 }}
            />

            <Button
                title={loading ? "Logging in..." : "Login"}
                onPress={handleLogin}
                disabled={loading}
            />

            <Text style={{ marginTop: 15 }}>Not Registered?</Text>

            <Button
                title="Sign Up"
                onPress={() => navigation.navigate("Registration")}
            />
        </View>
    );
}