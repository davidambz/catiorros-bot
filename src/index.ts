import { createPost } from "./blueskyHandler";
import { download, getURL, checkFileSize } from "./imageHandler";
import { startServer } from "./httpHandler";
import { startCronJob } from "./cronHandler";
import { loadPostedUrls, savePostedUrls } from "./jsonHandler";

const server = startServer();
const cronJob = startCronJob(main);

async function main() {
  let imageURL: string;
  const postedUrls = loadPostedUrls();

  while (true) {
    imageURL = await getURL();

    if (!postedUrls.includes(imageURL)) {
      await download(imageURL);

      try {
        const isSizeValid = await checkFileSize();
        if (isSizeValid) {
          postedUrls.push(imageURL);
          savePostedUrls(postedUrls);
          await createPost();
          break;
        } else {
          console.log(`Image is too large. Fetching a new image.`);
        }
      } catch (error) {
        console.error(`Error checking file size:`, error);
      }
    }
  }
}

process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  cronJob.stop();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
