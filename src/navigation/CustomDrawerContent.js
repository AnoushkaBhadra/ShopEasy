import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import { logout } from "../store/slices/authSlice";

export default function CustomDrawerContent(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            dispatch(logout());

            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Auth",
                },
              ],
            });
          },
        },
      ]
    );
  };

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

      <DrawerItem
        label="Logout"
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}