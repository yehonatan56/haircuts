const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const CONNECTION_STRING =
  process.env.CONNECTION_STRING || "mongodb://localhost:27017/test";

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
  type: String,
  price: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Haircuts = mongoose.model("Haircuts", haircuts);

app.post("/", async (req, res) => {
  try {
    const { name, phone, type, price, date } = req.body;
    const haircut = new Haircuts({
      name,
      phone,
      type,
      price,
      date,
    });

    await haircut.save();

    res.json(haircut);
  } catch (err) {
    console.error("Error saving haircut", err);
  }
});

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
