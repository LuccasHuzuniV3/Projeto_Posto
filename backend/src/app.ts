// src/app.ts
//vam oooo
import express, { Application, json } from "express";
import cors from "cors";
import { routes } from "./routers";
import session from "express-session";

export const app: Application = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://projeto-posto-liart.vercel.app',
    'https://projeto-posto.vercel.app'
  ],
  credentials: true
}));


app.use(json());
// Em src/app.ts

app.use(
  session({
    secret: "seu_segredo_super_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,    // MANTENHA 'false' para desenvolvimento em HTTP
      httpOnly: true,   // Boa prática: impede que o JavaScript do front-end leia o cookie
      sameSite: 'lax'   // A configuração que permite o envio em navegações
    }, 
  })
);

app.use((req, res, next) => {
  console.log("🔍 Origin recebido:", req.headers.origin);
  next();
});


app.use(routes);
 