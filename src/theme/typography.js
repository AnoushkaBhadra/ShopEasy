import { Platform } from "react-native";
const IOS = Platform.OS === "ios";
export const FONT_FAMILY = {
  logo: "Arsenal-Regular",
  logoBold: "Arsenal-Bold",

  heading: "EBGaramond_700Bold",
  headingSemi: "EBGaramond_600SemiBold",

  body: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

export const FONT_SIZE = {
  xs: IOS ? 13 : 12,
  sm: IOS ? 15 : 14,
  md: IOS ? 17 : 16,
  lg: IOS ? 19 : 18,
  xl: IOS ? 26 : 24,
  xxl: IOS ? 34 : 32,
  display: IOS ? 46 : 44,
};

export const LINE_HEIGHT = {
  xs: 18,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 40,
  display: 52,
};

export const LETTER_SPACING = {
  tight: -0.4,
  normal: 0,
  wide: 0.3,
  widest: 0.8,
};

const TYPOGRAPHY = {
  logo: {
    fontFamily: FONT_FAMILY.logo,
    fontSize: FONT_SIZE.display,
    letterSpacing: LETTER_SPACING.widest,
  },

  h1: {
    fontFamily: FONT_FAMILY.heading,
    fontSize: FONT_SIZE.display,
    lineHeight: LINE_HEIGHT.display,
    letterSpacing: LETTER_SPACING.tight,
  },

  h2: {
    fontFamily: FONT_FAMILY.heading,
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxl,
    letterSpacing: LETTER_SPACING.tight,
  },

  h3: {
    fontFamily: FONT_FAMILY.headingSemi,
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xl,
  },

  title: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.lg,
    lineHeight: LINE_HEIGHT.lg,
  },

  body: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
  },

  bodySmall: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
  },

  caption: {
    fontFamily: FONT_FAMILY.body,
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    letterSpacing: LETTER_SPACING.wide,
  },

  button: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    letterSpacing: LETTER_SPACING.normal,
  },

  label: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
  },

  price: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
  },
};

export default TYPOGRAPHY;