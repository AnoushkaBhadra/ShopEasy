import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  Pressable,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {
  getAddresses,
  deleteAddress,
} from "../../services/addressService";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

export default function SavedAddressScreen({
  navigation,
  route,
}) {
  const selectionMode = route.params?.selectionMode || false;

  const user = useSelector((state) => state.auth.user);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useFocusEffect(
    useCallback(() => {
        if (user) {
            loadAddresses();
        }
    }, [user])
);

  async function loadAddresses() {
    try {
      if (!user) return;

      const data = await getAddresses(user.id);

      setAddresses(data);

      if (selectionMode) {
        const defaultAddress = data.find(
          (item) => item.isDefault
        );

        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAddress(id);
              loadAddresses();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  }

  function renderItem({ item }) {
    const selected =
      selectedAddress?.id === item.id;

    return (
      <Pressable
        onPress={() => {
          if (selectionMode) {
            setSelectedAddress(item);
          }
        }}
        style={({ pressed }) => [
          styles.card,
          selected && styles.selectedCard,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.label}</Text>
          {item.isDefault && (
            <Text style={styles.defaultBadge}>DEFAULT</Text>
          )}
        </View>

        <Text style={styles.addressText}>{item.addressLine}</Text>

        <Text style={styles.addressText}>
          {item.city}, {item.state}
        </Text>

        <Text style={styles.addressText}>{item.pincode}</Text>

        <Text style={styles.addressText}>{item.country}</Text>

        <Text style={styles.coordinateText}>
          {item.latitude}, {item.longitude}
        </Text>

        {!selectionMode && (
          <View style={styles.cardActions}>
            <Pressable
              style={({ pressed }) => [
                styles.smallButton,
                pressed && styles.pressed,
              ]}
              onPress={() =>
                navigation.navigate("AddressForm", {
                  addressId: item.id,
                })
              }
            >
              <Text style={styles.smallButtonText}>Edit</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.smallButton,
                styles.deleteButton,
                pressed && styles.pressed,
              ]}
              onPress={() =>
                handleDelete(item.id)
              }
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectionMode ? "Choose an Address" : "Saved Addresses"}
      </Text>
      <Text style={styles.subtitle}>
        {selectionMode
          ? "Select where you would like your order delivered."
          : "Manage your saved delivery locations."}
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.primaryButtonPressed,
        ]}
        onPress={() =>
          navigation.navigate("AddressForm")
        }
      >
        <Text style={styles.addButtonText}>Add Address</Text>
      </Pressable>

      <FlatList
        data={addresses}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No saved addresses</Text>
            <Text style={styles.emptyText}>
              Add an address to make checkout quicker.
            </Text>
          </View>
        }
      />

      {selectionMode && (
        <Pressable
          disabled={!selectedAddress}
          style={({ pressed }) => [
            styles.proceedButton,
            !selectedAddress && styles.disabledButton,
            pressed && selectedAddress && styles.primaryButtonPressed,
          ]}
          onPress={() =>
            navigation.navigate("Payment", {
              selectedAddress,
            })
          }
        >
          <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxl,
    backgroundColor: COLORS.background,
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
  addButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    ...SHADOW.button,
  },
  addButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
  list: {
    paddingBottom: SPACING.lg,
  },
  card: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
  },
  defaultBadge: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryDark,
    paddingVertical: SPACING.xxs,
    paddingHorizontal: SPACING.xs,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.background,
  },
  addressText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  coordinateText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    marginTop: SPACING.sm,
  },
  cardActions: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingTop: SPACING.md,
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  smallButton: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
  },
  smallButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary,
  },
  deleteButton: {
    borderColor: COLORS.error,
  },
  deleteButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.error,
  },
  proceedButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    ...SHADOW.button,
  },
  proceedButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
  disabledButton: {
    backgroundColor: COLORS.disabled,
  },
  primaryButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  pressed: {
    opacity: 0.75,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: SPACING.xxl,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
