import { Platform } from "react-native";

const SCALE = Platform.OS === "ios" ? 1.1 : 1;

export const SPACING = {
  xxs: 4 * SCALE,
  xs: 8 * SCALE,
  sm: 12 * SCALE,
  md: 16 * SCALE,
  lg: 24 * SCALE,
  xl: 32 * SCALE,
  xxl: 48 * SCALE,
  xxxl: 64 * SCALE,
};