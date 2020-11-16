import Queue from "bee-queue";

const queueOptions = { redis: { host: "redis" } };

export const testQueue = new Queue("test", queueOptions);
