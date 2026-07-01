export const FONT_FAMILY = {
  logo: "Arsenal-Regular",
  logoBold: "Arsenal-Bold",

  heading: "Manrope_700Bold",
  headingSemi: "Manrope_600SemiBold",

  body: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  display: 36,
};

export const LINE_HEIGHT = {
  xs: 18,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 38,
  display: 44,
};

export const LETTER_SPACING = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  widest: 1,
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
  },

  h2: {
    fontFamily: FONT_FAMILY.headingSemi,
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxl,
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
    letterSpacing: 0.3,
  },

  price: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
  },
};

export default TYPOGRAPHY;