import { trigram } from "./trigram";

export const trigramFromArray = (
  values: string[]
): {
  [key: string]: boolean;
} => {
  const txt = values
    .join(" ")
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return trigram(txt);
};
