import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AppStack from "./AppStack";
import OrderHistoryScreen from "../screens/Orders/OrderHistoryScreen";
import SavedAddressScreen from "../screens/Address/SavedAddressScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import HelpScreen from "../screens/Support/HelpScreen";

const Drawer= createDrawerNavigator();

export default function AppDrawer() {
    return(
        <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen name="ShopEasy" component={AppStack}/>
            <Drawer.Screen name="Orders" component={OrderHistoryScreen}/>
            <Drawer.Screen name="Saved Addresses" component={SavedAddressScreen}/>
            <Drawer.Screen name="Help & Support" component={HelpScreen}/>
        </Drawer.Navigator>
    )
}