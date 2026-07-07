import { app } from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`Health Ledger API running on port ${env.port}`);
});
