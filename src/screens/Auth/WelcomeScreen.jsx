import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/icon.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>Welcome to ShopEasy</Text>

            <Text style={styles.subtitle}>
                Discover thousands of products at the best prices.
            </Text>

            <Pressable style={styles.button}
                title="Login with Email"
                onPress={() => navigation.navigate("Auth")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#f6f3ec",
    },

    logo: {
        width: 180,
        height: 180,
        resizeMode: "contain",
        marginBottom: 24,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#734900",
        marginBottom: 12,
    },

    subtitle: {
        textAlign: "center",
        fontSize: 16,
        color: "#555",
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    button: {
        flex: 1, 
    }, 
});