import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const frontendFiles = path.join(__dirname, "dist");
app.use(express.static(frontendFiles));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendFiles, "index.html"), (err) => {
        if (err) {
            res.status(500).send("Server Error");
        }
    });
});

const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.CONNECTION_STRING || "mongodb://localhost:27017/test";

const TOKEN = process.env.TOKEN;
const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("Connected to the database");
    } catch (err) {
        console.error("Failed to connect to the database", err);
    }
};

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to database", err);
    });

const haircuts = new mongoose.Schema({
    name: String,
    phone: {
        type: String,
        required: true,
    },
    type: {
        enum: [0, 1],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Haircuts = mongoose.model("Haircuts", haircuts);

app.post(
    "/",
    async (req, res, next) => {
        const { name, phone, type, date } = req.body;

        const message = `
    שלום  ${name},
    נקבע לך תור לתספורת במחיר של  ${type === 0 ? "50" : "60"}} ש"ח
    בתאריך  ${new Date(date).toLocaleDateString()}
    בשעה  ${new Date(date).toLocaleTimeString()}
    10 דקות לפני התור נשלח לך תזכורת
    ציון😊
    `;

        const phoneToWhatsapp = "972" + phone.slice(1);

        fetch("https://gate.whapi.cloud/messages/text", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                typing_time: 0,
                to: phoneToWhatsapp,
                body: message,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log("Success:", data))
            .catch((error) => console.error("Error:", error));

        next();
    },

    async (req, res) => {
        try {
            const { name, phone, type, date } = req.body;
            const haircut = new Haircuts({
                name,
                phone,
                type,
                date,
            });

            await haircut.save();

            res.json(haircut);
        } catch (err) {
            console.error("Error saving haircut", err);
        }
    }
);

app.get("/", async (_req, res) => {
    try {
        const haircuts = await Haircuts.find();
        res.json(haircuts);
    } catch (err) {
        console.error("Error getting haircuts", err);
    }
});

app.get("/today", async (_req, res) => {
    try {
        const today = new Date();
        const haircuts = await Haircuts.find({
            date: {
                $gte: today.setHours(0, 0, 0, 0),
                $lt: today.setHours(23, 59, 59, 999),
            },
        });
        res.json(haircuts);
    } catch (err) {
        console.error("Error getting haircuts", err);
    }
});

app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Haircuts.findByIdAndDelete(id);
        res.send("Haircut deleted");
    } catch (err) {
        console.error("Error deleting haircut", err);
    }
});

setInterval(async () => {
    try {
        const tenMinutesLater = new Date(new Date().getTime() + 10 * 60 * 1000);
        const haircut = await Haircuts.findOne({
            date: {
                $gte: tenMinutesLater,
                $lt: new Date(tenMinutesLater.getTime() + 60 * 1000),
            },
        });
        if (haircut) {
            const phoneToWhatsapp = "972" + haircut.phone.slice(1);

            const message = `
        שלום  ${haircut.name},
        תזכורת לתור שלך בעוד 10 דקות
        ציון😊
        `;

            fetch("https://gate.whapi.cloud/messages/text", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + TOKEN,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    typing_time: 0,
                    to: phoneToWhatsapp,
                    body: message,
                }),
            })
                .then((response) => response.json())
                .then((data) => console.log("Success:", data))
                .catch((error) => console.error("Error:", error));
        }
    } catch (err) {
        console.error("Error retrieving haircut", err);
    }
}, 1000 * 60);
