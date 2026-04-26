import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// import your routes
import invoiceRoutes from "./routes/invoiceRoutes.js";

dotenv.config(); // MUST be at top

const app = express();

// connect DB
connectDB();

// middleware
app.use(express.json());
app.use(cors()); // allow frontend requests

// mount routes
app.use("/api/invoices", invoiceRoutes); // ✅ THIS WAS MISSING

// use PORT from env or fallback
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
