import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import qr from "qr-image";
import { v4 as uuidv4 } from "uuid";
import { uploadToCloudinary } from "./utils/cloudinary.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) return res.status(400).json({ error: "URL is required" });

        const qrBuffer = qr.imageSync(url, { type: "png" });
        const filename = `qr-${uuidv4()}.png`;

        // Save temporarily to local disk
        fs.writeFileSync(`uploads/${filename}`, qrBuffer);

        // Upload to Cloudinary
        const uploaded = await uploadToCloudinary(`uploads/${filename}`, "smartqr");

        // Delete the local file
        fs.unlinkSync(`uploads/${filename}`);

        res.status(200).json({ imageUrl: uploaded.secure_url });
    } catch (error) {
        console.error("Error generating QR:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
