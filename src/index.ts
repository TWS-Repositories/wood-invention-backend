import express from "express";
import dotenv from "dotenv";
import catalogosRouter from "./routes/catalogosRoutes";
import presupuestosRoutes from "./routes/presupuestosRoutes";
import configRoutes from "./routes/configRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Wood Invention API running 🪵" });
});
app.use('/api', catalogosRouter);
app.use('/api/presupuestos', presupuestosRoutes);
app.use('/api/config', configRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
