import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getInvoices,
  getInvoicesById,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/", createInvoice);
router.get("/", getInvoices);
router.delete("/:id", deleteInvoice);
router.get("/:id", getInvoicesById);

export default router;
