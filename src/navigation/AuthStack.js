import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name = "Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen}/>
        </Stack.Navigator>
    )
}