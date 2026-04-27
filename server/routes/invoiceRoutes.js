import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getInvoices,
  getInvoicesById,
  updateInvoicesById,
} from "../controllers/invoiceController.js";
import { upload } from "../upload.js";

const router = express.Router();

router.post("/", upload.single("attachment"), createInvoice);
router.get("/", getInvoices);
router.delete("/:id", deleteInvoice);
router.get("/:id", getInvoicesById);
router.put("/:id", upload.single("attachment"), updateInvoicesById);
export default router;
