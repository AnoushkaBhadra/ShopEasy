import { Platform } from "react-native";

const IOS_RADIUS = Platform.OS === "ios";

export const RADIUS = {
  xs: IOS_RADIUS ? 6 : 4,
  sm: IOS_RADIUS ? 8 : 6,
  md: IOS_RADIUS ? 12 : 8,
  lg: IOS_RADIUS ? 16 : 12,
  xl: IOS_RADIUS ? 20 : 16,
  pill: 999,
};