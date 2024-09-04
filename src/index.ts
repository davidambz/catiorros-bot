import { createPost } from "./blueskyHandler";
import { download, getURL } from "./imageHandler";
import { startServer } from "./httpHandler";
import { startCronJob } from "./cronHandler";

async function main() {
  try {
    const imageURL = await getURL();
    console.log(imageURL);
    await download(imageURL);
    await createPost();
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error in main function:`,
      error
    );
  }
}

const server = startServer();
const cronJob = startCronJob(main);

process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  cronJob.stop();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
