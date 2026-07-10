import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import CartScreen from "../screens/Cart/CartScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import WishlistScreen from "../screens/Wishlist/WishlistScreen";

import { COLORS } from "../theme/colors";
import TYPOGRAPHY from "../theme/typography";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textSecondary,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
                case "Home":
                iconName = focused ? "home" : "home-outline";
                break;

                case "Cart":
                iconName = focused ? "cart" : "cart-outline";
                break;
                
                case "WishList": 
                iconName = focused ? "heart" : "heart-outline";
                break;

                case "Profile":
                iconName = focused ? "person" : "person-outline";
                break;

                default:
                iconName = "ellipse";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        },
        })}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Cart" component={CartScreen}/>
        <Tab.Screen name="WishList" component={WishlistScreen}/>
        <Tab.Screen name="Profile" component={ProfileScreen}/>
        
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.surface,
        borderTopColor: COLORS.border,
        borderTopWidth: 1,
        height: 65,
        paddingTop: 6,
        paddingBottom: 8,
        elevation: 8,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 8,
    },

    tabLabel: {
        ...TYPOGRAPHY.caption,
        marginBottom: 2,
    },
});
