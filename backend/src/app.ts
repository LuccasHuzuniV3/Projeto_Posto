import express, { Application, json } from "express";
import cors from "cors";
import session from "express-session";
import { routes } from "./routers";

export const app: Application = express();

// Confiar no proxy do Render (necessário para cookies "secure" funcionarem)
app.set("trust proxy", 1);

app.use(cors({
  origin: "https://projeto-posto-liart.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(json());

// Configuração de sessão
app.use(
  session({
    secret: "seu_segredo_super_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // só usa secure no Render
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // necessário pro Vercel + Render
      maxAge: 1000 * 60 * 60 * 2 // 2h (opcional)
    },
  })
);

app.use(routes);
