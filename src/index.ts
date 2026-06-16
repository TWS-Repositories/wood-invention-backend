import express from "express";
import dotenv from "dotenv";
import catalogosRouter from "./routes/catalogosRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Wood Invention API running 🪵" });
});
app.use('/api', catalogosRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
