import express from "express";
import bodyParser from "body-parser";

import searchRoutes from "./routes/search.routes";
import { handleResponse } from "../handlers/response.handler";
import { handleError } from "../handlers/error.handler";

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use("/api/v1", searchRoutes);

app.use(handleResponse);

app.use(handleError);

export default app;
