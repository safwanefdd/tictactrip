import crypto from "crypto";
import { User } from "../types";

export let usersList: User[] = [
  {
    email: "safwane_f@hotmail.com",
    token: "0d23c3f4d54bc6148d206708b8798e72",
    wordCount: 180,
    lastResetDate: Date.now(),
  },
];

export const getUserByEmail = (email: string): User | undefined => {
  return usersList.find((u) => u.email === email);
};

export const createUser = (email: string): User => {
  const newUser: User = {
    email: email,
    token: crypto.randomBytes(16).toString("hex"),
    wordCount: 0,
    lastResetDate: Date.now(),
  };

  usersList.push(newUser);
  return newUser;
};
