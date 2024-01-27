export const getFontColor = (color?: string | null) => {
  if (!color) return '#000000';

  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#ffffff';
};
