import { createClient } from "redis";

export const redis = createClient({
  url: "redis://redis:6379"
});

redis.on("error", (err) => console.error("Redis error:", err));

(async () => {
  await redis.connect();
})();
