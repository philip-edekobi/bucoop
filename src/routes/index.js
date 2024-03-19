import member from "./memberRoutes.js";
import admin from "./adminRoutes.js";
import loan from "./loanRoutes.js";
import withdrawal from "./withdrawalRoutes.js";
import contrib from "./contribRoutes.js";
import loanType from "./loanTypeRoutes.js";

export function setupRoutes(app) {
  app.get("/", (_, res) => {
    res.send("Hi");
  });

  app.use("/member", member);
  app.use("/admin", admin);
  app.use("/loan", loan);
  app.use("/withdrawal", withdrawal);
  app.use("/contribution", contrib);
  app.use("/loanType", loanType);
}
