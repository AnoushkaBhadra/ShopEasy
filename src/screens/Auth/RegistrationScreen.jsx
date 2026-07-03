import React, {useState} from "react";
import { View, Text, Button, Alert, TextInput, Pressable, KeyboardAvoidingView, StyleSheet} from "react-native";

import { saveAuthData, getToken } from "../../utils/authStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { RADIUS } from "../../theme/radius";
import { SHADOW } from "../../theme/shadows";
import { SPACING } from "../../theme/spacing";


import { register} from "../../services/authService";
export default function RegistrationScreen({navigation}) {
    const[email, setEmail] = useState("");
    const[name, setName] = useState("");
    const[password, setPassword] = useState("");
    const[isRegistering, setIsRegistering] = useState(false);

    const handleRegistration = async () => {
        console.log("REGISTRATION CLICKED")
        try {
            setIsRegistering(true);
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
            setIsRegistering(false);
        }

    }

    return (
        <SafeAreaView style = {{flex: 1}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>

                        <Text style={styles.subtitle}>
                            Join ShopEasy and start shopping.
                        </Text>
                    </View>

                    <View style={styles.form}>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Full Name</Text>

                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your full name"
                                placeholderTextColor={COLORS.textSecondary}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Email</Text>

                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="Enter your email"
                                placeholderTextColor={COLORS.textSecondary}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Password</Text>

                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholder="Create a password"
                                placeholderTextColor={COLORS.textSecondary}
                                style={styles.input}
                            />
                        </View>

                        <Pressable
                            onPress={handleRegistration}
                            disabled={isRegistering}
                            style={({ pressed }) => [
                                styles.button,
                                pressed && styles.buttonPressed,
                                isRegistering && { opacity: 0.7 },
                            ]}
                        >
                            <Text style={styles.buttonText}>
                                {isRegistering ? "Creating Account..." : "Create Account"}
                            </Text>
                        </Pressable>

                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Already have an account?
                        </Text>

                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.link}>Login</Text>
                        </Pressable>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.background,
        paddingHorizontal: 24,
    },

    header: {
        marginBottom: 40,
    },

    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text,
        marginBottom: 8,
    },

    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
    },

    form: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
    },

    label: {
        ...TYPOGRAPHY.label,
        color: COLORS.text,
        marginBottom: SPACING.sm,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginTop: SPACING.sm,
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: SPACING.md,
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        ...TYPOGRAPHY.body,
    },

    button: {
        height: 48,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        marginTop: SPACING.md,
        ...SHADOW.button,
    },

    buttonPressed: {
        backgroundColor: COLORS.primaryDark,
    },

    buttonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.surface,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
        gap: SPACING.xs,
    },

    footerText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text,
    },

    link: {
        ...TYPOGRAPHY.body,
        color: COLORS.primary,
        fontWeight: "600",
    },
});