import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

export default function CustomDrawerContent(props) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="ShopEasy"
        onPress={() => navigation.navigate("ShopEasy")}
      />

      <DrawerItem
        label="Orders"
        onPress={() => navigation.navigate("Orders")}
      />

      <DrawerItem
        label="Saved Addresses"
        onPress={() =>
          navigation.navigate("ShopEasy", {
            screen: "Saved Addresses",
          })
        }
      />

      <DrawerItem
        label="Help & Support"
        onPress={() => navigation.navigate("Help & Support")}
      />
    </DrawerContentScrollView>
  );
}