import locations from '../api/Location';

const faKeyMap = {
  q: 'ض',
  w: 'ص',
  e: 'ث',
  r: 'ق',
  t: 'ف',
  y: 'غ',
  u: 'ع',
  i: 'ه',
  o: 'خ',
  p: 'ح',
  a: 'ش',
  s: 'س',
  d: 'ی',
  f: 'ب',
  g: 'ل',
  h: 'ا',
  j: 'ت',
  k: 'ن',
  l: 'م',
  z: 'ظ',
  x: 'ط',
  c: 'ز',
  v: 'ر',
  b: 'ذ',
  n: 'د',
  m: 'پ',
};

const convertToPersian = (input) =>
  input
    .split('')
    .map((char) => faKeyMap[char.toLowerCase()] || char)
    .join('');

const filteredLocations = locations.filter((loc) => {
  const query = searchTerm.trim();
  const convertedQuery = convertToPersian(query);
  return loc.name.includes(query) || loc.name.includes(convertedQuery);
});

export default convertToPersian;
