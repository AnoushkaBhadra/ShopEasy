import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";

import { registrationSchema } from "../../validation/registrationSchema";
import { saveAuthData, getToken } from "../../utils/authStorage";
import { register } from "../../services/authService";

import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { RADIUS } from "../../theme/radius";
import { SHADOW } from "../../theme/shadows";
import { SPACING } from "../../theme/spacing";

export default function RegistrationScreen({ navigation }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegistration = async (values) => {
    console.log("REGISTRATION CLICKED");

    try {
      setIsRegistering(true);

      const response = await register(
        values.name,
        values.email,
        values.password
      );

      console.log(values.name, values.email, values.password);

      await saveAuthData(response.token, response.user);

      const storedToken = await getToken();

      console.log("RESULT TOKEN:", response.token);
      console.log("TOKEN STORED:", storedToken);

      if (!storedToken) {
        throw new Error("Token not saved");
      }

      Alert.alert("Success", "User Registered");

      console.log("REGISTRATION SUCCESSFUL");

      navigation.replace("App");
    } catch (err) {
      console.log(err);

      Alert.alert("Registration Failed", err.message);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.safeArea}   behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>

            <Text style={styles.subtitle}>
              Join ShopEasy and start shopping.
            </Text>
          </View>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={registrationSchema}
            onSubmit={handleRegistration}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <View style={styles.form}>
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Full Name</Text>

                  <TextInput
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    placeholder="Enter your full name"
                    placeholderTextColor={COLORS.textSecondary}
                    style={styles.input}
                    editable={!isRegistering}
                  />

                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Email</Text>

                  <TextInput
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    placeholderTextColor={COLORS.textSecondary}
                    style={styles.input}
                    editable={!isRegistering}
                  />

                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Password</Text>

                  <TextInput
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                    placeholder="Create a password"
                    placeholderTextColor={COLORS.textSecondary}
                    style={styles.input}
                    editable={!isRegistering}
                  />

                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>

                <Pressable
                    onPress={() => handleSubmit()}
                    disabled={isRegistering}
                    android_ripple={{ color: COLORS.primaryLight }}
                    style={({ pressed }) => [
                        styles.button,
                        Platform.OS === "ios" && pressed && styles.buttonPressed,
                        isRegistering && { opacity: 0.7 },
                    ]}
                    >
                  <Text style={styles.buttonText}>
                    {isRegistering
                      ? "Creating Account..."
                      : "Create Account"}
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>

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
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
  flex: 1,
  justifyContent: "center",
  backgroundColor: COLORS.background,
  paddingHorizontal: SPACING.lg,
  paddingTop: Platform.OS === "android" ? SPACING.sm : 0,
},

  header: {
    marginBottom: SPACING.xl,
  },

  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },

  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  form: {
  backgroundColor: COLORS.surface,
  borderWidth: 1,
  borderColor: COLORS.border,
  borderRadius: Platform.OS === "ios" ? 18 : 12,
  padding: SPACING.lg,
  marginBottom: SPACING.xl,
  ...SHADOW.card,
},

  fieldGroup: {
    marginTop: SPACING.sm,
  },

  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  input: {
  height: Platform.OS === "ios" ? 52 : 48,
  borderWidth: 1,
  borderColor: COLORS.border,
  borderRadius: Platform.OS === "ios" ? 12 : 8,
  paddingHorizontal: SPACING.md,
  paddingVertical: Platform.OS === "ios" ? 12 : 8,
  backgroundColor: COLORS.surface,
  color: COLORS.text,
  ...TYPOGRAPHY.body,
},

  error: {
  color: COLORS.error,
  ...TYPOGRAPHY.caption,
  marginTop: 4,
},

  button: {
  height: Platform.OS === "ios" ? 52 : 48,
  justifyContent: "center",
  alignItems: "center",
  marginTop: SPACING.md,
  borderRadius: Platform.OS === "ios" ? 12 : 8,

  ...SHADOW.button,

  ...Platform.select({
    ios: {
      backgroundColor: COLORS.primaryDark,
    },
    android: {
      backgroundColor: COLORS.primary,
    },
  }),
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
    marginTop: SPACING.lg,
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