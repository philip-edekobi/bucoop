import startServer from "./startServer.js";

const PORT = process.env.PORT || 4000;

try {
  startServer(PORT);
} catch (e) {
  console.error(e);
  process.exit(1);
}
