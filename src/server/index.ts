import express from "express";
import cors from "cors";

import searchRoutes from "./routes/search.routes";
import { handleResponse } from "../handlers/response.handler";
import { handleError } from "../handlers/error.handler";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", searchRoutes);

app.use(handleResponse);

app.use(handleError);

export default app;
