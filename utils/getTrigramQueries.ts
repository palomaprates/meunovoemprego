import { QueryFieldFilterConstraint, where } from "firebase/firestore";
import { trigram } from "./trigram";

export const getTrigramQueries = (selected: string, field: string) => {
  if (!selected.length) return [];
  const array = trigram(selected);
  const queries: QueryFieldFilterConstraint[] = [];
  Object.keys(array).forEach((key) => {
    queries.push(where(`${field}.${key}`, "==", true));
  });
  return queries;
};
