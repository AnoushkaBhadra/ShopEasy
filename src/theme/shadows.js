import { Platform } from "react-native";

export const SHADOW = {
  card: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.12,
      shadowRadius: 10,
    },

    android: {
      elevation: 4,
    },
  }),

  button: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },

    android: {
      elevation: 6,
    },
  }),

  floating: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },

    android: {
      elevation: 8,
    },
  }),
};