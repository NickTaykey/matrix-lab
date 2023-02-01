const isColorDark = (color: string) => {
  const [r, g, b] = color
    .substring(color.indexOf('(') + 1, color.length - 1)
    .split(', ')
    .map((n) => Number(n));
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (luma < 140) return true;
  return false;
};

const genRandomColor = (trasparency = 1) => {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgb${trasparency < 1 ? 'a' : ''}(${r}, ${g}, ${b}${
    trasparency < 1 ? ', ' + trasparency : ''
  })`;
};

export { isColorDark, genRandomColor };
