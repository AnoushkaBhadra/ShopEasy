import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AppStack from "./AppStack";
import CustomDrawerContent from "./CustomDrawerContent";

import OrderHistoryScreen from "../screens/Orders/OrderHistoryScreen";
import HelpScreen from "../screens/Support/HelpScreen";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
    >
      <Drawer.Screen
        name="ShopEasy"
        component={AppStack}
      />

      <Drawer.Screen
        name="Orders"
        component={OrderHistoryScreen}
      />

      <Drawer.Screen
        name="Help & Support"
        component={HelpScreen}
      />
    </Drawer.Navigator>
  );
}