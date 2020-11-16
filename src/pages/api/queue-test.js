import { testQueue } from "../../lib/queue";

export default function handler(req, res) {
  const job = testQueue.createJob({x: 2, y: 3});
  job.save();
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end('{ result: "Ok" }');
}
