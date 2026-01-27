import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Order from "@/models/Order";

connectDB();

// POST - Reject order
export async function POST(req, res) {
  const reqBody = await req.json();
  const { orderId, rejectionReason } = reqBody;

  if (!orderId) {
    return createError(res, 422, "Order ID is required!");
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return createError(res, 404, "Order not found!");
    }

    if (order.status !== "PENDING") {
      return createError(
        res,
        400,
        `Order is already ${order.status}. Cannot reject.`
      );
    }

    const rejectedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "REJECTED",
        rejectionReason: rejectionReason || "No reason provided",
      },
      { new: true }
    );

    return successMessage(res, rejectedOrder, "Order rejected successfully!");
  } catch (err) {
    console.log("Error Occur While Rejecting Order: ", err);
    return createError(res, 500, err.message || err);
  }
}
