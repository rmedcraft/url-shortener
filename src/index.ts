// src/server.ts

import express, { application } from "express";
import { nanoid } from "nanoid"
import type { Application, Request, Response } from "express"

const app: Application = express();
const PORT = 3000;

const urls: Map<string, string> = new Map()

app.use(express.json())

// Basic GET route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: "Its working!!" });
});

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "ok" });
});

app.post('/shorten', (req: Request, res: Response) => {
    let originalUrlStr: string = req.body.originalUrl

    console.log(originalUrlStr)

    if (!originalUrlStr) {
        return res.sendStatus(400)
    }

    originalUrlStr = originalUrlStr.trim()

    // if the url doesnt start with https://, fix that
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(originalUrlStr)) {
        originalUrlStr = 'https://' + originalUrlStr;
    }

    let originalUrl: URL
    try {
        originalUrl = new URL(originalUrlStr)
    } catch (error) {
        return res.sendStatus(400)
    }

    // remove unnecessary slashes & sort search parameters to ensure we dont store the same URL twice
    originalUrl.pathname = originalUrl.pathname
        .replace(/\/{2,}/g, '/')
        .replace(/\/+$/, '')

    originalUrl.searchParams.sort()

    // remove port from URL if not necessary
    if (
        (originalUrl.protocol === 'http:' && originalUrl.port === '80') ||
        (originalUrl.protocol === 'https:' && originalUrl.port === '443')
    ) {
        originalUrl.port = '';
    }

    // find the URL if it exists, and if it does return that URL
    for (const id in urls.keys()) {
        if (urls.get(id) === originalUrl.toString()) {
            return res.json({
                shortURL: id
            })
        }
    }

    // generate random ID
    let id = nanoid(7)
    while (urls.has(id)) {
        id = nanoid(7)
    }

    urls.set(id, originalUrl.toString())

    console.log(urls)
    res.json({
        shortURL: id
    })
})

// Start the server
app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
});
