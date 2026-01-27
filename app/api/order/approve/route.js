import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Customer from "@/models/Customer";
import Item from "@/models/Item";
import Product from "@/models/Product";
import Transaction from "@/models/Transaction";
import Order from "@/models/Order";

connectDB();

// POST - Approve order (converts order to transaction, updates stock & customer accounts)
export async function POST(req, res) {
  const reqBody = await req.json();
  const { orderId, approvedBy } = reqBody;

  if (!orderId) {
    return createError(res, 422, "Order ID is required!");
  }

  try {
    // Find the order
    const order = await Order.findById(orderId).populate("items.itemId");
    if (!order) {
      return createError(res, 404, "Order not found!");
    }

    if (order.status !== "PENDING") {
      return createError(
        res,
        400,
        `Order is already ${order.status}. Cannot approve.`
      );
    }

    // Check if invoice_no already exists in Transactions
    const existingTransaction = await Transaction.findOne({
      invoice_no: order.invoice_no,
    });
    if (existingTransaction) {
      return createError(
        res,
        409,
        "Invoice number already exists in transactions!"
      );
    }

    // Validate item quantities are available
    for (const orderItem of order.items) {
      const item = await Item.findById(orderItem.itemId);
      if (!item) {
        return createError(res, 404, `Item ${orderItem.itemId} not found!`);
      }
      if (item.qty < orderItem.qty) {
        return createError(
          res,
          400,
          `Insufficient stock for item ${item.name || item.code}. Available: ${item.qty}, Required: ${orderItem.qty}`
        );
      }
    }

    // Create Product documents (same as transaction route)
    const productIds = await Promise.all(
      order.items.map(async (orderItem) => {
        const { itemId, qty, price, purchase, amount } = orderItem;
        const savedProduct = await new Product({
          itemId,
          qty,
          price,
          purchase,
          amount,
        }).save();
        return savedProduct._id;
      })
    );

    // Update Item quantities (decrement stock, increment out_qty)
    await Promise.all(
      order.items.map(async (orderItem) => {
        const { itemId, qty } = orderItem;
        await Item.findByIdAndUpdate(
          itemId,
          { $inc: { qty: -qty, out_qty: qty } },
          { new: true }
        );
      })
    );

    // Create Transaction (same as customer/create-bill flow)
    const transaction = await new Transaction({
      customerId: order.customerId,
      date: order.date,
      discount: order.discount,
      items: productIds,
      total_amount: order.total_amount,
      invoice_no: order.invoice_no,
    }).save();

    if (!transaction) {
      return createError(res, 400, "Unable to create transaction!");
    }

    // Update Customer totals (same as customer/create-bill flow)
    await Customer.findByIdAndUpdate(
      order.customerId,
      {
        $inc: {
          total: order.total_amount,
          remaining: Number(order.total_amount) - Number(order.discount),
          discount: order.discount,
        },
      },
      { new: true }
    );

    // Update order status to APPROVED
    const approvedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "APPROVED",
        approvedBy: approvedBy || null,
        approvedAt: Math.floor(Date.now() / 1000),
      },
      { new: true }
    );

    return successMessage(
      res,
      {
        order: approvedOrder,
        transaction,
      },
      "Order approved successfully! Transaction created and accounts updated."
    );
  } catch (err) {
    console.log("Error Occur While Approving Order: ", err);
    return createError(res, 500, err.message || err);
  }
}
