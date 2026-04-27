import Invoice from "../models/Invoice.js";

export const createInvoice = async (req, res) => {
  try {
    const body = req.body;

    const invoiceData = {
      customerName: body.customerName,
      custmer_no: body.custmer_no,
      advance: body.advance,
      address: body.address,
      totalAmount: body.totalAmount,

      // ❗ IMPORTANT FIX
      items: body.items ? JSON.parse(body.items) : [],
    };

    if (req.file) {
      invoiceData.attachment = req.file.filename;
    }

    const invoice = await Invoice.create(invoiceData);

    res.status(201).json(invoice);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const data = await Invoice.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({
        message: "Error while deleting invoice",
      });
    }

    return res.status(200).json({
      message: "Successfully deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

export const getInvoicesById = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      message: "Invoice fetched successfully",
      data: invoice,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateInvoicesById = async (req, res) => {
  try {
    const { id } = req.params;

    const existingInvoice = await Invoice.findById(id);
    if (!existingInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    let updatedData = { ...req.body };

    if (req.body.items) {
      updatedData.items = JSON.parse(req.body.items);
    }

    if (req.file) {
      updatedData.attachment = req.file.filename;
    }

    // 🔥 Compare old vs new
    const isSame =
      JSON.stringify(existingInvoice.toObject()) ===
      JSON.stringify({ ...existingInvoice.toObject(), ...updatedData });

    if (isSame) {
      return res.status(200).json({
        message: "Entring Same Value",
        data: existingInvoice,
      });
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
