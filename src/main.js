import express from "express";
import "dotenv/config";
import cors from "cors";
import dns from "dns";
import cookieParser from "cookie-parser";
import connectionDB from "./config/db.js";
import router from "./routes/index.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectionDB();
  console.log(`Server is running on PORT ${PORT}`);
});
