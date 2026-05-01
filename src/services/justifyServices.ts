import { User } from "../types";

export let usersList: User[] = [
  {
    email: "safwane_f@hotmail.com",
    token: "0d23c3f4d54bc6148d206708b8798e72",
    wordCount: 180,
    lastResetDate: Date.now(),
  },
];

export const getUserByToken = (token: string): User | undefined => {
  return usersList.find((u) => u.token === token);
};

export const countWords = (text: string): number => {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
};

export const justifyText = (text: string): string => {
  const mots = text.trim().split(/\s+/);
  let texteFinal = "";
  let motsLigne: string[] = [];
  let longueurAccumulee = 0;

  for (let mot of mots) {
    if (longueurAccumulee + mot.length + motsLigne.length > 80) {
      let ligne = "";

      // On vérifie que le tableau n'est pas vide avant d'accéder à [0]
      if (motsLigne.length === 1 && motsLigne[0]) {
        ligne = motsLigne[0].padEnd(80);
      } else if (motsLigne.length > 1) {
        let espacesAFiller = 80 - longueurAccumulee;
        let i = 0;
        while (espacesAFiller > 0) {
          motsLigne[i] += " ";
          espacesAFiller--;
          // On ne rajoute pas d'espaces après le dernier mot de la ligne
          i = (i + 1) % (motsLigne.length - 1);
        }
        ligne = motsLigne.join("");
      }

      texteFinal += ligne + "\n";
      motsLigne = [mot];
      longueurAccumulee = mot.length;
    } else {
      motsLigne.push(mot);
      longueurAccumulee += mot.length;
    }
  }

  texteFinal += motsLigne.join(" ");
  return texteFinal;
};
