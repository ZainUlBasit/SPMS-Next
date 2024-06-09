import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Item from "@/models/Item";
import Company from "@/models/Company";

connectDB();

//******************************************************
// working
//******************************************************
export async function POST(req, res, next) {
  const reqBody = await req.json();
  const { itemId, qty: newQty } = reqBody;
  console.log(reqBody);

  try {
    const updatedItem = await Item.findOneAndUpdate(
      { _id: itemId },
      { $inc: { qty: newQty } },
      { new: true } // This option returns the updated document
    );

    if (!updatedItem) {
      return createError(res, 500, "Failed to increment value");
    }

    const UpdateCompanyAccount = await Company.findOneAndUpdate(
      {
        _id: updatedItem.companyId,
      },
      {
        $inc: {
          total: Number(updatedItem.purchase) * Number(newQty),
          remaining: Number(updatedItem.purchase) * Number(newQty),
        },
      }
    );

    if (!UpdateCompanyAccount)
      return createError(res, 400, "Unable to update company accounts!");
    return successMessage(res, updatedItem, "Quantity successfully added!");
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
