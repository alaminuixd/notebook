import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv";

dotenv.config();

// Create Redis client using your Upstash credentials
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a rate limiter: 10 requests per minute per identifier
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "60 s"), // this limit is per user.
  prefix: "@upstash/ratelimit",
  analytics: true,
});
export default ratelimit;
