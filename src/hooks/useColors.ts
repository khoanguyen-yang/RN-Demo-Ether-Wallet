import themes, { ThemeColor } from '../constants/colors';

export const useColors = (): ThemeColor => {
  const theme = 'light'; // can extend further by storing the theme inside Redux
  return themes[theme];
};
