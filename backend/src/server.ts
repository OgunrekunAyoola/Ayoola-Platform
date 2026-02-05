import { config } from "./config/env";
import { connectDB } from "./config/db";
import app from "./app";

// Database Connection
connectDB();

// Start Server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
