import { testQueue } from "./lib/queue";
import { models } from "./lib/db";

testQueue.process(async (job) => {
  console.log(`Processing job ${job.id} with ${job.data.x}, ${job.data.y}`);
  await models.Author.create({ name: `random ${job.id}` });
});
