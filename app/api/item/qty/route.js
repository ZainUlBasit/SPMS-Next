import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";
import Item from "@/models/Item";

connectDB();

//******************************************************
// working
//******************************************************
export async function POST(req, res, next) {
  const reqBody = await req.json();
  let { itemId, itemqty } = reqBody;
  const newQty = itemqty;
  // query data
  let item;
  try {
    item = Item.findByIdAndUpdate(itemId, { $inc: { itemqty: newQty } });
    console.log(item);
    if (!item) return createError(res, 500, "Failed to increment value");
    successMessage(res, result, "Quantity successfully added!");
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
