import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Query is required" });

    try {
        const response = await fetch(`https://lexica.art/api/v1/search?q=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "application/json",
            },
        });

        const data = await response.json();
        console.log("Lexica API Response:", data); // Debugging

        if (!data || !data.images) {
            return res.status(404).json({ error: "No images found!" });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching from Lexica:", error);
        res.status(500).json({ error: "Failed to fetch from Lexica" });
    }
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Proxy running on http://192.168.1.47:${PORT}`));
