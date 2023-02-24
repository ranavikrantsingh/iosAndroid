export const THEME = {
  DEFAULT: '#B23AFC',
  PRIMARY: '#259821',
  SECONDARY: '#175fad',
  ACCENT: '#ea2734',
  INFO: '#1232FF',
  ERROR: '#FE2472',
  WARNING: '#FF9C09',
  SUCCESS: '#45DF31',
  BACKGROUND: '#f1f6f8',
  DISABLED: '#DADADA',
};

export const COMPONENTS = {
  INPUT: '#808080',
  PLACEHOLDER: '#9FA5AA',
  NAVBAR: '#b8e8ce', // '#A1EA19E6',
  BLOCK: '#808080',
  ICON: '#000000',
};

const COLORS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GREY: '#898989',
  MUTED: '#9FA5AA',
  TRANSPARENT: 'transparent',
  NEUTRAL: 'rgba(255,255,255, 0.65)',
  ...COMPONENTS,
  ...THEME,
};

export default COLORS;
