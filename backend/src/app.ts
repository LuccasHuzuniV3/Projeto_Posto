import express, { Application, json } from "express";
import cors from "cors";
import session from "express-session";
import { routes } from "./routers";

export const app: Application = express();

app.use(cors({
  origin: "https://projeto-posto-liart.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(json());

app.use(
  session({
    secret: "seu_segredo_super_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: true, 
      httpOnly: true,
      sameSite: "none"
    },
  })
);

app.use(routes);
