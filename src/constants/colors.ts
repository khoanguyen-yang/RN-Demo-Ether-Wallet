enum Color {
  white = 0,
  black,
  grey,
  blue,
  orange,
}

export type ThemeColor = Record<keyof typeof Color, string>;

enum Theme {
  'light',
}

const light: ThemeColor = {
  white: '#FFFFFF',
  black: '#000000',
  grey: '#6F787E',
  blue: '#0080FF',
  orange: '#FF7F00',
};

const themes: Record<keyof typeof Theme, ThemeColor> = {
  light,
};

export default themes;
