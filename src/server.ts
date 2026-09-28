import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

import representanteRoutes from "./routes/representanteRoutes";
import clienteRoutes from "./routes/clienteRoutes";

const app = express(); // app representa o servidor HTTP
app.use(cors()); // servidor vai usar CORS
app.use(express.json()); // servidor vai receber JSON no body das requisições

// primeira rota da API: responde a GET em "/"
app.get("/", (req, res) => {
  res.json({ status: "API HandCraft no ar" });
});

app.use("/representantes", representanteRoutes);
app.use("/clientes", clienteRoutes);

// O errorHandler DEVE ser registrado por último, depois de todas as rotas
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
