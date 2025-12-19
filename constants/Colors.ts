/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */


// Invess Agriculture color palette
const invessGreen = '#7ED957'; // Main green from logo
const invessDarkGreen = '#4CAF50'; // Accent/contrast green
const invessText = '#222';
const invessGray = '#e5e5e5';
const invessRed = '#dc3545';
const invessYellow = '#ffc107';
const invessBlue = '#1e90ff';

export const Colors = {
  light: {
    text: invessText,
    background: '#fff', // Main background is white
    card: invessGreen, // Cards are green
    cardText: '#fff', // Text inside cards is white
    tint: invessGreen,
    icon: invessDarkGreen,
    tabIconDefault: invessGray,
    tabIconSelected: invessGreen,
    accent: invessGreen,
    textDark: invessDarkGreen,
    textSecondary: '#666',
    border: invessGray,
    warning: invessRed,
    info: invessBlue, // Use blue for info (requests, bag numbers)
    success: invessDarkGreen,
    highlight: invessYellow,
    blue: invessBlue,
    red: invessRed,
  },
  dark: {
    text: '#fff',
    background: '#222',
    card: invessGreen,
    cardText: '#fff',
    tint: invessGreen,
    icon: invessGreen,
    tabIconDefault: invessGray,
    tabIconSelected: invessGreen,
    accent: invessGreen,
    textDark: '#fff',
    textSecondary: '#bbb',
    border: invessGray,
    warning: invessRed,
    info: invessBlue,
    success: invessGreen,
    highlight: invessYellow,
    blue: invessBlue,
    red: invessRed,
  },
};
