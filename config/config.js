import "dotenv/config";

const CONFIG = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  NODE_ENV: process.env.NODE_ENV,
};
export default CONFIG;
