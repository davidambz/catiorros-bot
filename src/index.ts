import { CronJob } from "cron";
import { createServer, IncomingMessage, ServerResponse } from "http";

import { createPost } from "./blueskyHandler";
import { download, getURL } from "./imageHandler";

async function main() {
  try {
    const imageURL = await getURL();
    await download(imageURL);
    await createPost();
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error in main function:`,
      error
    );
  }
}

function startServer() {
  const port = process.env.PORT || 4000;
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World!\n");
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  return server;
}

function startCronJob() {
  const scheduleExpression = process.env.CRON_EXPRESSION || "*/5 * * * *";
  const job = new CronJob(scheduleExpression, main, null, true);
  console.log(`Cron job scheduled with expression: ${scheduleExpression}`);
  return job;
}

const server = startServer();
const cronJob = startCronJob();

process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  cronJob.stop();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
