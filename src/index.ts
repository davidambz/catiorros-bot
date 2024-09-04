import { CronJob } from "cron";

import { createPost } from "./blueskyHandler";
import { download, getURL } from "./imageHandler";
import { startServer } from "./httpHandler";

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

function startCronJob() {
  const scheduleExpression = process.env.CRON_EXPRESSION || "* * * * *";
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
