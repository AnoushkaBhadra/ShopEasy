import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function HelpScreen() {
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
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

        <Text>Email</Text>
        <Text>support@shopeasy.com</Text>

        <View style={{ height: 15 }} />

        <Text>Phone</Text>
        <Text>+91 9876543210</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Working Hours
        </Text>

        <Text>Monday - Saturday</Text>
        <Text>9:00 AM - 7:00 PM</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <Text>ShopEasy v1.0</Text>
        <Text>© 2026 ShopEasy</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 15,
  },

  card: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },

  question: {
    fontSize: 16,
    fontWeight: "600",
  },

  answer: {
    marginTop: 10,
    lineHeight: 22,
  },

  section: {
    marginTop: 25,
  },
});