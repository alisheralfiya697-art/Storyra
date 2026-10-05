export const Colors = {
  primary: '#7D2948', // Deep Luxury Burgundy
  primaryLight: '#9E385D',
  primaryDark: '#50162B',
  accent: '#E8C547', // Glowing Gold
  accentLight: '#F3DB7A',
  backgroundLight: '#FAF8F5',
  backgroundDark: '#151210',
  cardLight: '#FFFFFF',
  cardDark: '#201C19',
  borderLight: '#ECE6DE',
  borderDark: '#322A24',
  textLight: '#1E1B18',
  textDark: '#F3ECE4',
  subtextLight: '#8E7F73',
  subtextDark: '#A89D91',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Typography = {
  titleLarge: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  titleMedium: {
    fontSize: 20,
    fontWeight: '700' as const,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
};
