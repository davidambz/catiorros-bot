import { createServer, IncomingMessage, ServerResponse } from "http";

export function startServer() {
  const port = process.env.PORT || 5000;
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("server running!\n");
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  return server;
}
