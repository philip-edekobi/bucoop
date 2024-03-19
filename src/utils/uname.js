import { nanoid } from "nanoid";

export function generateMemberId(fname, lname) {
  const rand = nanoid(3);

  return rand + fname + lname.slice(0, 4);
}
