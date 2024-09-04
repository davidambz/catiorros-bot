import { CronJob } from "cron";

export function startCronJob(func: () => void) {
  const scheduleExpression = process.env.CRON_EXPRESSION || "* * * * *";
  const job = new CronJob(scheduleExpression, func, null, true);
  console.log(`Cron job scheduled with expression: ${scheduleExpression}`);
  return job;
}
