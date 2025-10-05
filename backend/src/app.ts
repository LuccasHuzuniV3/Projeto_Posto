// src/app.ts
import express, { Application, json } from "express";
import cors from "cors";
import { routes } from "./routers";

export const app: Application = express();

app.use(cors());
app.use(json());
app.use(routes);
