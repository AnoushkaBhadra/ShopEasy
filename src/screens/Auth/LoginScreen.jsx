import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { login } from "../../services/authService";
import { saveAuthData, getToken } from "../../utils/authStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { RADIUS } from "../../theme/radius";
import { SPACING } from "../../theme/spacing";

import { SHADOW } from "../../theme/shadows";


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
            navigation.replace("App");
            console.log("LOGIN SUCCESSFUL");
        } catch (err) {
    console.log("LOGIN ERROR:", err);
    console.log("MESSAGE:", err.message);
    console.log("RESPONSE:", err.response);
    console.log("REQUEST:", err.request);

    Alert.alert("Login Failed", err.message);
} finally {
            setLoading(false);
        }
    };
 
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <View style={styles.container}>
                    {/* Header section */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>
                            Sign in to continue shopping
                        </Text>
                    </View>
 
                    {/* Form section */}
                    <View style={styles.form}>
                        {/* Email field */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="Enter your email"
                                placeholderTextColor={COLORS.textTertiary}
                                style={styles.input}
                                editable={!loading}
                            />
                        </View>
 
                        {/* Password field */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.textTertiary}
                                style={styles.input}
                                editable={!loading}
                            />
                        </View>
 
                        {/* Login button */}
                        <Pressable
                            onPress={handleLogin}
                            disabled={loading}
                            style={({ pressed }) => [
                                styles.button,
                                pressed && !loading && styles.buttonPressed,
                                loading && { opacity: 0.7 },
                            ]}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? "Logging in..." : "Login"}
                            </Text>
                        </Pressable>
                    </View>
 
                    {/* Footer section */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Not registered?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Registration")}
                        >
                            <Text style={styles.link}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.background,
    },

    // Header: Title and subtitle
    header: {
        alignItems: "center",
        marginBottom: SPACING.xxl,
    },

    title: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
        marginBottom: SPACING.sm,
    },

    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
    },

    // Form container: minimal card with hairline border
    form: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        ...SHADOW.card,
    },

    // Field group: email or password field with label
    fieldGroup: {
        paddingTop: SPACING.sm,
    },

    label: {
        ...TYPOGRAPHY.label,
        color: COLORS.text,
        marginBottom: SPACING.sm,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    // Minimal input: hairline border, no border radius
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: SPACING.md,
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        ...TYPOGRAPHY.body,
    },
 
    // Minimal button: no border radius, clean shadow
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
 
    // Footer: sign up link
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
