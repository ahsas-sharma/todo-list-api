import app from "./app.js";
import CONFIG from "./config/config.js";

const PORT = CONFIG.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} `);
});
