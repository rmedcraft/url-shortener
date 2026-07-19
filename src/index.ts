// src/server.ts

import express from "express";
import type { Application, Request, Response } from "express"

const app: Application = express();
const PORT = 3000;

// Basic GET route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: "Its working!!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
});
