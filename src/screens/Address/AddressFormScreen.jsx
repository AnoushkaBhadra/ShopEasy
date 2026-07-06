import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  getAddress,
  addAddress,
  updateAddress,
} from "../../services/addressService";

import { clearLocation } from "../../store/slices/locationSlice";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

const addressValidationSchema = Yup.object({
  label: Yup.string().required("Label is required."),
  addressLine: Yup.string().required("Address line is required."),
  city: Yup.string().required("City is required."),
  state: Yup.string().required("State is required."),
  pincode: Yup.string()
    .required("Pincode is required.")
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits."),
  country: Yup.string().required("Country is required."),
  latitude: Yup.string().required("Latitude is required."),
  longitude: Yup.string().required("Longitude is required."),
});

export default function AddressFormScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const addressId = route.params?.addressId;

  const user = useSelector((state) => state.auth.user);

  const location = useSelector((state) => state.location);

  const latitudeFromRedux = location?.latitude;
  const longitudeFromRedux = location?.longitude;

  const [isDefault, setIsDefault] = useState(false);

  const formik = useFormik({
    initialValues: {
      label: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      latitude: "",
      longitude: "",
    },
    validationSchema: addressValidationSchema,
    onSubmit: handleSave,
  });

  useEffect(() => {
    dispatch(clearLocation());

    if (addressId) {
      loadAddress();
    }
  }, []);

  useEffect(() => {
    console.log("REDUX LOCATION:", latitudeFromRedux, longitudeFromRedux);
    if (latitudeFromRedux != null && longitudeFromRedux != null) {
      formik.setFieldValue("latitude", String(latitudeFromRedux));
      formik.setFieldValue("longitude", String(longitudeFromRedux));
    }
  }, [latitudeFromRedux, longitudeFromRedux]);

  async function loadAddress() {
    try {
      const address = await getAddress(addressId);

      formik.setValues({
        label: address.label,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        pincode: String(address.pincode),
        country: address.country,
        latitude: String(address.latitude),
        longitude: String(address.longitude),
      });
      setIsDefault(address.isDefault);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave(values) {
    try {
      if (!user) {
        Alert.alert("Error", "User not found.");
        return;
      }

      const addressData = {
        userId: user.id,
        label: values.label,
        addressLine: values.addressLine,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        country: values.country,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        isDefault,
      };

      if (addressId) {
        await updateAddress(addressId, addressData);

        Alert.alert("Success", "Address updated.");
      } else {
        await addAddress(addressData);

        Alert.alert("Success", "Address added.");
      }

      dispatch(clearLocation());

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {addressId ? "Edit Address" : "Add Address"}
        </Text>
        <Text style={styles.subtitle}>Enter your delivery details below.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Label</Text>

          <TextInput
            value={formik.values.label}
            onChangeText={formik.handleChange("label")}
            onBlur={formik.handleBlur("label")}
            style={styles.input}
            placeholderTextColor={COLORS.textTertiary}
          />
          {formik.touched.label && formik.errors.label && (
            <Text>{formik.errors.label}</Text>
          )}

          <Text style={styles.label}>Address Line</Text>

          <TextInput
            value={formik.values.addressLine}
            onChangeText={formik.handleChange("addressLine")}
            onBlur={formik.handleBlur("addressLine")}
            style={styles.input}
            placeholderTextColor={COLORS.textTertiary}
          />
          {formik.touched.addressLine && formik.errors.addressLine && (
            <Text>{formik.errors.addressLine}</Text>
          )}

          <Text style={styles.label}>City</Text>

          <TextInput
            value={formik.values.city}
            onChangeText={formik.handleChange("city")}
            onBlur={formik.handleBlur("city")}
            style={styles.input}
            placeholderTextColor={COLORS.textTertiary}
          />
          {formik.touched.city && formik.errors.city && (
            <Text>{formik.errors.city}</Text>
          )}

          <Text style={styles.label}>State</Text>

          <TextInput
            value={formik.values.state}
            onChangeText={formik.handleChange("state")}
            onBlur={formik.handleBlur("state")}
            style={styles.input}
            placeholderTextColor={COLORS.textTertiary}
          />
          {formik.touched.state && formik.errors.state && (
            <Text>{formik.errors.state}</Text>
          )}

          <Text style={styles.label}>Pincode</Text>

          <TextInput
            value={formik.values.pincode}
            onChangeText={formik.handleChange("pincode")}
            onBlur={formik.handleBlur("pincode")}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={COLORS.textTertiary}
          />
          {formik.touched.pincode && formik.errors.pincode && (
            <Text>{formik.errors.pincode}</Text>
          )}

          <Text style={styles.label}>Country</Text>

          <TextInput
            value={formik.values.country}
            onChangeText={formik.handleChange("country")}
            onBlur={formik.handleBlur("country")}
            style={styles.input}
            placeholderTextColor={COLORS.textTertiary}
          />
          {formik.touched.country && formik.errors.country && (
            <Text>{formik.errors.country}</Text>
          )}

          <Text style={styles.label}>Latitude</Text>

          <TextInput
            value={formik.values.latitude}
            onBlur={formik.handleBlur("latitude")}
            editable={false}
            style={[styles.input, styles.readOnlyInput]}
          />
          {formik.touched.latitude && formik.errors.latitude && (
            <Text>{formik.errors.latitude}</Text>
          )}

          <Text style={styles.label}>Longitude</Text>

          <TextInput
            value={formik.values.longitude}
            onBlur={formik.handleBlur("longitude")}
            editable={false}
            style={[styles.input, styles.readOnlyInput]}
          />
          {formik.touched.longitude && formik.errors.longitude && (
            <Text>{formik.errors.longitude}</Text>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate("MapSelection")}
          >
            <Text style={styles.secondaryButtonText}>Pick Location on Map</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={formik.handleSubmit}
          >
            <Text style={styles.primaryButtonText}>
              {addressId ? "Update Address" : "Save Address"}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              isDefault && styles.selectedButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => setIsDefault(!isDefault)}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                isDefault && styles.selectedButtonText,
              ]}
            >
              {isDefault ? "Default Address" : "Set as Default"}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.textButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => {
              dispatch(clearLocation());
              navigation.goBack();
            }}
          >
            <Text style={styles.textButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxl,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  form: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    ...SHADOW.card,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    ...TYPOGRAPHY.body,
  },
  readOnlyInput: {
    backgroundColor: COLORS.background,
    color: COLORS.textSecondary,
  },
  primaryButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    ...SHADOW.button,
  },
  primaryButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
  secondaryButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary,
  },
  selectedButton: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  selectedButtonText: {
    color: COLORS.surface,
  },
  textButton: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.xs,
  },
  textButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
