import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";
import { COLORS } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import TYPOGRAPHY from "../../theme/typography";
import { SHADOW } from "../../theme/shadows";
import { SPACING } from "../../theme/spacing";

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/icon.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>Welcome to ShopEasy</Text>

            <Text style={styles.subtitle}>
                Discover thousands of products at the best prices.
            </Text>

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress={() => navigation.navigate("Auth")}
            >
                <Text style={styles.buttonText}>Login with Email</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.background,
    },
 
    logo: {
        width: 160,
        height: 160,
        resizeMode: "contain",
        marginBottom: SPACING.xl,
    },
 
    title: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text,
        textAlign: "center",
        marginBottom: SPACING.sm,
    },
 
    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textSecondary,
        textAlign: "center",
        maxWidth: 300,
        marginBottom: SPACING.xxl,
    },
 
    // Minimal button: no border radius, clean shadow
    button: {
        width: "100%",
        maxWidth: 320,
        height: 48,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOW.button,
    },
 
    buttonPressed: {
        backgroundColor: COLORS.primaryDark,
    },
 
    buttonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.surface,
    },
});
 


