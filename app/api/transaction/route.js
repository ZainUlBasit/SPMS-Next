import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Customer from "@/models/Customer";
import Item from "@/models/Item";
import Product from "@/models/Product";
import Transaction from "@/models/Transaction";

connectDB();

export async function POST(req, res, next) {
  const reqBody = await req.json();
  const {
    customerId,
    date = new Date(),
    items,
    discount,
    invoice_no,
  } = reqBody;

  if (
    !customerId ||
    !date ||
    discount === "" ||
    invoice_no === "" ||
    Number(invoice_no) < 0
  )
    return createError(res, 422, "Required fields are undefined!");

  if (!Array.isArray(items))
    return createError(res, 422, "Items must be an array of objects!");

  // Adjust the date to 00:00:00 (midnight)
  const transactionDate = new Date(date);
  transactionDate.setUTCHours(0, 0, 0, 0);
  const transactionTimestamp = Math.floor(transactionDate.getTime() / 1000);

  try {
    const productIds = await Promise.all(
      items.map(async (item) => {
        const { itemId, qty, price, purchase, amount } = item;
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
    let totalAmount = 0;
    await Promise.all(
      items.map(async (item) => {
        const { itemId, qty, amount } = item;
        await Item.findByIdAndUpdate(
          itemId,
          { $inc: { qty: -qty, out_qty: qty } }, // Decrement qty field by decrementQty
          { new: true } // Return the updated document
        );
        totalAmount += amount;
      })
    );

    const transaction = await new Transaction({
      customerId,
      date: transactionTimestamp,
      discount,
      items: productIds,
      total_amount: totalAmount,
      invoice_no,
    }).save();

    if (!transaction)
      return createError(res, 400, "Unable to Add Transaction!");
    await Customer.findByIdAndUpdate(
      customerId,
      {
        $inc: {
          total: totalAmount,
          remaining: Number(totalAmount) - Number(discount),
          discount: discount,
        },
      }, // Decrement qty field by decrementQty
      { new: true }
    );
    return successMessage(res, transaction, "Transaction Successfully Added!");
  } catch (err) {
    console.log("Error Occur While Transaction: ", err);
    return createError(res, 500, err.message || err);
  }
}
