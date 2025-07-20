const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./routes/api");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/health", (req, res) => res.json({ status: "OK" }));

const server = app.listen(PORT, () => {
    console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.error("Erro não tratado:", err);
    server.close(() => process.exit(1));
});