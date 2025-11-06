// src/app.ts
import express, { Application, json } from "express";
import cors from "cors";
import { routes } from "./routers";
import session from "express-session";

export const app: Application = express();

app.use(cors({
  origin: [
    "https://projeto-posto-liart.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(json());

app.use(
  session({
    secret: "seu_segredo_super_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,
      httpOnly: true,
      sameSite: "lax"
    },
  })
);

app.use((req, res, next) => {
  console.log("🔍 Origin recebido:", req.headers.origin);
  next();
});

app.use(routes);
