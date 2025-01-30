export const formatString = (str) => {
  return str.replace(/(\d{4})(?=\d)/g, '$1 ');
}