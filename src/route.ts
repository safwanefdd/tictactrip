import { IncomingMessage, ServerResponse } from "http";
import { getUserByEmail, createUser, usersList } from "./services/userServices";
import {
  getUserByToken,
  justifyText,
  countWords,
} from "./services/justifyServices";

export function handleRoutes(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usersList));
  } else if (method === "POST" && url === "/api/token") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const { email } = JSON.parse(body);
        let user = getUserByEmail(email) || createUser(email);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ token: user.token }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Format JSON invalide" }));
      }
    });
  } else if (method === "POST" && url === "/api/justify") {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.replace("Bearer ", "");
    const user = getUserByToken(token || "");

    if (!user) {
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Token non valide ou manquant" }),
      );
    }

    let textBody = "";
    req.on("data", (chunk) => {
      textBody += chunk.toString();
    });
    req.on("end", () => {
      const nouveauxMots = countWords(textBody);

      if (user.wordCount + nouveauxMots > 80000) {
        res.writeHead(402, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Quota dépassé" }));
      }

      user.wordCount += nouveauxMots;
      const resultat = justifyText(textBody);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(resultat);
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route non trouvée" }));
  }
}
