import express from "express";
import cors from "cors";
import db from "./config/database.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Login JWT aktif" });
});

app.use("/api/auth", authRoute);

const startServer = async () => {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Gagal menjalankan server:", error);
  }
};

startServer();