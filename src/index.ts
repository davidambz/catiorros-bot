import { CronJob } from 'cron';

import { createPost } from "./blueskyHandler";
import { download, getURL } from "./imageHandler";

async function main() {
  try {
    const imageURL = await getURL();
    await download(imageURL);
    
    createPost()
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();

const scheduleExpression5Minutes = '*/5 * * * *';
const scheduleExpression = '0 */3 * * *';

const job = new CronJob(scheduleExpression5Minutes, main);

job.start();