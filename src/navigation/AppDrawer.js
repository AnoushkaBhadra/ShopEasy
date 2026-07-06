import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AppStack from "./AppStack";
import OrderHistoryScreen from "../screens/Orders/OrderHistoryScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import HelpScreen from "../screens/Support/HelpScreen";
import SavedAddressScreen from "../screens/Address/SavedAddressScreen";
import AddressFormScreen from "../screens/Address/AddressFormScreen";
import MapSelectionScreen from "../screens/Address/MapSelectionScreen";


const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ShopEasy" component={AppStack} />

      <Drawer.Screen name="Orders" component={OrderHistoryScreen} />

      <Drawer.Screen name="Saved Addresses" component={SavedAddressScreen} />

      <Drawer.Screen
        name="AddressForm"
        component={AddressFormScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />

      <Drawer.Screen
        name="MapSelection"
        component={MapSelectionScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />

      <Drawer.Screen name="Help & Support" component={HelpScreen} />
    </Drawer.Navigator>
  );
}
