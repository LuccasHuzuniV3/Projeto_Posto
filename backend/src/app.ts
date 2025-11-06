// src/app.ts
import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { routes } from "./routers";
import session from "express-session";

export const app: Application = express();

// 🔧 Configuração correta para Render + Vercel
app.set("trust proxy", 1);

const allowedOrigins = [
  "https://projeto-posto-liart.vercel.app",
  "https://projeto-posto.vercel.app",
  "http://localhost:3000",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("🚫 Origin bloqueado pelo CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(json());

// 🔧 Middleware para lidar com preflight OPTIONS
app.options("*", (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.use(
  session({
    secret: "seu_segredo_super_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // altere para true se usar HTTPS com domínio próprio
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
