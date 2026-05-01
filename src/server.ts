import http, { IncomingMessage, ServerResponse } from "http";
import { handleRoutes } from "./route";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    handleRoutes(req, res);
  },
);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port http://localhost:${PORT}/`);
});
