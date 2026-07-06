import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch } from "react-redux";

import { login as loginUser } from "../../services/authService";
import { saveAuthData, getToken } from "../../utils/authStorage";
import { login, setLoading } from "../../store/slices/authSlice";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLocalLoading] = useState(false);

  const handleLogin = async () => {
    dispatch(setLoading(true));
    setLocalLoading(true);

    try {
      const result = await loginUser(email, password);

      await saveAuthData(result.token, result.user);

      const storedToken = await getToken();

      console.log("RESULT TOKEN:", result.token);
      console.log("TOKEN STORED:", storedToken);

      if (!storedToken) {
        throw new Error("Token not saved");
      }

      dispatch(
        login({
          user: result.user,
          token: result.token,
        }),
      );

      Alert.alert("Success", "Login successful");

      console.log("LOGIN SUCCESSFUL");

      navigation.getParent()?.replace("App");
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      console.log("MESSAGE:", err.message);
      console.log("RESPONSE:", err.response);
      console.log("REQUEST:", err.request);

      Alert.alert("Login Failed", err.message);
    } finally {
      dispatch(setLoading(false));
      setLocalLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue shopping</Text>
          </View>

          <View style={styles.form}>
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

          <View style={styles.footer}>
            <Text style={styles.footerText}>Not registered?</Text>
            <Pressable onPress={() => navigation.navigate("Registration")}>
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

  form: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOW.card,
  },

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
