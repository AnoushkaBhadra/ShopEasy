import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../theme/colors";
import TYPOGRAPHY from "../../theme/typography";
import { SPACING } from "../../theme/spacing";
import { SHADOW } from "../../theme/shadows";
import { RADIUS } from "../../theme/radius";

export default function HelpScreen() {
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>Help & Support</Text>

      <Text style={styles.sectionTitle}>
        Frequently Asked Questions
      </Text>

      <Pressable
        style={styles.card}
        onPress={() => setFaq1(!faq1)}
      >
        <Text style={styles.question}>
          {faq1 ? "▼ " : "► "}How do I place an order?
        </Text>

        {faq1 && (
          <Text style={styles.answer}>
            Browse products, add them to your cart,
            proceed to checkout, select your delivery
            address, choose a payment method and place
            your order.
          </Text>
        )}
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => setFaq2(!faq2)}
      >
        <Text style={styles.question}>
          {faq2 ? "▼ " : "► "}How do I cancel an order?
        </Text>

        {faq2 && (
          <Text style={styles.answer}>
            Open your Orders page and select the order
            you want to cancel. Cancellation is
            available before the order is shipped.
          </Text>
        )}
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => setFaq3(!faq3)}
      >
        <Text style={styles.question}>
          {faq3 ? "▼ " : "► "}How do I track my order?
        </Text>

        {faq3 && (
          <Text style={styles.answer}>
            Go to the Orders section from the drawer to
            view the current status of your order.
          </Text>
        )}
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => setFaq4(!faq4)}
      >
        <Text style={styles.question}>
          {faq4 ? "▼ " : "► "}How do I contact support?
        </Text>

        {faq4 && (
          <Text style={styles.answer}>
            You can reach us using the email address or
            phone number provided below.
          </Text>
        )}
      </Pressable>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>

        <Text style={styles.metaLabel}>Email</Text>
        <Text style={styles.metaValue}>support@shopeasy.com</Text>

        <View style={styles.spacer} />

        <Text style={styles.metaLabel}>Phone</Text>
        <Text style={styles.metaValue}>+91 9876543210</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Working Hours
        </Text>

        <Text style={styles.metaLabel}>Monday - Saturday</Text>
        <Text style={styles.metaValue}>9:00 AM - 7:00 PM</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <Text style={styles.metaLabel}>ShopEasy v1.0</Text>
        <Text style={styles.metaValue}>© 2026 ShopEasy</Text>
      </View>
    </ScrollView>
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

  heading: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },

  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },

  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
    ...SHADOW.card,
  },

  question: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
  },

  answer: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },

  section: {
    marginTop: SPACING.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
  },

  metaLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
  },

  metaValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.xxs,
  },

  spacer: {
    height: SPACING.md,
  },
});
