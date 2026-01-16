require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const leadRoutes = require("./routes/leadRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use("/api/leads", leadRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
