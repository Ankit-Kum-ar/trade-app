import "dotenv/config";
import app from "./app.js";
import { db } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await db.execute("SELECT 1");

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed");
    console.error(error);
  }
}

startServer();