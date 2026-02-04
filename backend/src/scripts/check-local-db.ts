
import mongoose from "mongoose";

const LOCAL_URI = "mongodb://localhost:27017/ayoola-platform";

async function check() {
  console.log("Testing connection to local MongoDB...");
  try {
    await mongoose.connect(LOCAL_URI, { serverSelectionTimeoutMS: 2000 });
    console.log("SUCCESS: Local MongoDB is running and accessible.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err: any) {
    console.log("FAILURE: Could not connect to local MongoDB.");
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
}

check();
