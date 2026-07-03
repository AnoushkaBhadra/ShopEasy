import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import LoginScreen from "../screens/LoginScreen";
//import RegistrationScreen from "../screens/RegistrationScreen";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import HomeScreen  from "../screens/Home/HomeScreen";
import AuthStack from "./AuthStack";
import AppDrawer from "./AppDrawer";

const Stack = createNativeStackNavigator();

export default function RootStack() {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Auth" component={AuthStack}/>
            <Stack.Screen name="App" component={AppDrawer}/>
        </Stack.Navigator>
    )
}