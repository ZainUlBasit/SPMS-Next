import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Customer from "@/models/Customer";
import Item from "@/models/Item";
import Order from "@/models/Order";

connectDB();

// GET - List orders (for web admin)
export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "PENDING";
    const customerId = searchParams.get("customerId");

    const query = { status };
    if (customerId) {
      query.customerId = customerId;
    }

    const orders = await Order.find(query)
      .populate("customerId", "name contact phone address")
      .populate("items.itemId", "name code")
      .sort({ date: -1 })
      .lean();

    return successMessage(res, orders, "Orders retrieved successfully!");
  } catch (err) {
    console.log("Error Occur While Fetching Orders: ", err);
    return createError(res, 500, err.message || err);
  }
}

// POST - Create order (from mobile app)
export async function POST(req, res) {
  const reqBody = await req.json();
  const {
    customerId,
    date = new Date(),
    items,
    discount = 0,
    invoice_no,
  } = reqBody;

  // Validation
  if (
    !customerId ||
    !date ||
    discount === "" ||
    invoice_no === "" ||
    Number(invoice_no) < 0
  )
    return createError(res, 422, "Required fields are undefined!");

  if (!Array.isArray(items) || items.length === 0)
    return createError(res, 422, "Items must be a non-empty array!");

  // Validate each item
  for (const item of items) {
    if (!item.itemId || !item.qty || !item.price || !item.purchase || !item.amount) {
      return createError(res, 422, "Each item must have itemId, qty, price, purchase, and amount!");
    }
  }

  // Adjust the date to 00:00:00 (midnight)
  const orderDate = new Date(date);
  orderDate.setUTCHours(0, 0, 0, 0);
  const orderTimestamp = Math.floor(orderDate.getTime() / 1000);

  try {
    // Check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return createError(res, 404, "Customer not found!");
    }

    // Check if invoice_no already exists in Orders or Transactions
    const existingOrder = await Order.findOne({ invoice_no });
    if (existingOrder) {
      return createError(res, 409, "Invoice number already exists in orders!");
    }

    // Check invoice_no in Transaction model (import if needed)
    const Transaction = (await import("@/models/Transaction")).default;
    const existingTransaction = await Transaction.findOne({ invoice_no });
    if (existingTransaction) {
      return createError(res, 409, "Invoice number already exists in transactions!");
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + Number(item.amount), 0);

    // Create order with PENDING status
    const order = await new Order({
      customerId,
      date: orderTimestamp,
      discount,
      items,
      total_amount: totalAmount,
      invoice_no,
      status: "PENDING",
    }).save();

    if (!order) return createError(res, 400, "Unable to create order!");

    return successMessage(res, order, "Order created successfully and pending approval!");
  } catch (err) {
    console.log("Error Occur While Creating Order: ", err);
    return createError(res, 500, err.message || err);
  }
}
