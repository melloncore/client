/**
 * Central design-token source of truth.
 * Mirrors tailwind.config.ts so any component/section that needs raw
 * color values (charts, inline SVG, dynamic styles) pulls from one place
 * instead of hard-coding hex codes throughout the app.
 */

export const colors = {
  paper: "#F5F7FB",
  surface: "#FFFFFF",
  ink: "#0E1220",
  inkSoft: "#4B5163",
  inkMuted: "#7B8194",
  line: "#E3E6EF",
  brand: {
    50: "#EEF1F8",
    100: "#D6DCEE",
    200: "#AEB9DD",
    300: "#8695C9",
    400: "#5C6DAE",
    500: "#3B4C8C",
    600: "#2B3A6C",
    700: "#202C52",
    800: "#161E3A",
    900: "#0D1226",
  },
  coral: {
    50: "#FFF1EC",
    100: "#FFDCCE",
    200: "#FFB69A",
    300: "#FF9068",
    400: "#FF7A50",
    500: "#FF6B4A",
    600: "#E24F30",
    700: "#B93D24",
    800: "#8A2D1A",
    900: "#5C1E11",
  },
  teal: {
    50: "#E9FBF5",
    100: "#C6F3E3",
    200: "#8FE4C8",
    300: "#54D2AA",
    400: "#22BE8F",
    500: "#14A87C",
    600: "#0F8763",
    700: "#0B664C",
    800: "#084936",
    900: "#052E22",
  },
} as const;

/** Named semantic roles so feature code reads intent, not hex values. */
export const semantic = {
  primaryCta: colors.coral[500],
  primaryCtaHover: colors.coral[600],
  brandDark: colors.brand[800],
  brandMid: colors.brand[600],
  success: colors.teal[500],
  border: colors.line,
} as const;

export type ColorScale = keyof typeof colors.brand;
