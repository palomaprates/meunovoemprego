export const trigram = (txt: string) => {
  const map: { [key: string]: boolean } = {};
  const s1 = (txt || "").toLowerCase().replace(/\./g, "");
  const n = 3;
  for (let k = 0; k <= s1.length - n; k++) map[s1.substring(k, k + n)] = true;
  return map;
};
