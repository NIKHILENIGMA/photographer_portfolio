import express, { Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GlobalErrorHandler, NotFound } from "./util";

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";
import photoRoutes from "./routes/photo.routes";
import contactRoutes from "./routes/contact.routes";

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/authentication", authRoutes);
app.use("/api/v1/photos", photoRoutes);
app.use("/api/v1/contacts", contactRoutes);

app.use(NotFound)
app.use(GlobalErrorHandler.handleError); // Global error handler

app.get("/health", (_, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;
