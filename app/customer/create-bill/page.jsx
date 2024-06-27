"use client";
import { CheckInvoiceNoApi } from "@/Https";
import { CashLedgerColumns } from "@/assets/Columns/CashLedgerColumns";
import { ItemLedgerColumns } from "@/assets/Columns/ItemLedgerColumns";
import ItemLedgerCard from "@/components/Cards/ItemLedgerCard";
import CustomInput from "@/components/Inputs/CustomInput";
import CustomPopOver from "@/components/Inputs/CustomPopOver";
import ProcessLoader from "@/components/Loader/ProcessLoader";
import SimpleTable from "@/components/Tables/SimpleTable";
import { WarningToast } from "@/utils/ShowToast";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import { fetchCustomers } from "@/utils/Slices/CustomerSlice";
import { fetchItems } from "@/utils/Slices/ItemSlice";
import { fetchPaymentById } from "@/utils/Slices/PaymentSlice";
import { Popover, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CompanyLedger() {
  const [CurrentCustomer, setCurrentCustomer] = useState("");
  const CustomerState = useSelector((state) => state.CustomerState);
  const [BillNo, setBillNo] = useState("");
  const [BillNoExists, setBillNoExists] = useState(true);
  const [ItemCode, setItemCode] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemQty, setItemQty] = useState("");
  const [ItemPrice, setItemPrice] = useState("");
  const [ItemTotal, setItemTotal] = useState("");
  const [ItemId, setItemId] = useState("");
  const [CurrentItemQty, setCurrentItemQty] = useState("");
  const dispatch = useDispatch();
  const ItemState = useSelector((state) => state.ItemState);
  const itemCodeInputRef = useRef(null);
  const [NewItems, setNewItems] = useState([]);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchItems());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCustomerSelect = (customer) => {
    setCurrentCustomer(customer._id);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const CheckBillFetch = async () => {
    try {
      const response = await CheckInvoiceNoApi({
        invoice_no: Number(BillNo),
      });
      setBillNoExists(response.data.data.payload.exists);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (BillNo !== "") {
      CheckBillFetch();
    } else {
      setBillNoExists(true);
    }
  }, [BillNo]);

  useEffect(() => {
    if (ItemCode === "") {
      setItemPrice("");
      setItemName("");
      setItemId("");
    } else {
      const currentItem = ItemState.data.find((dt) => dt.code === ItemCode);
      if (currentItem) {
        setItemPrice(currentItem.sale);
        setItemName(currentItem.name);
        setItemId(currentItem._id);
        setCurrentItemQty(currentItem.qty);
      } else {
        setItemPrice("");
        setItemName("");
        setItemId("");
        setCurrentItemQty("");
      }
    }
  }, [ItemCode, ItemState.data]);

  const handleAddItem = () => {
    if (ItemCode === "" || ItemQty === "" || ItemPrice === "") {
      WarningToast("Please enter item code/qty/price");
    } else {
      setNewItems([
        ...NewItems,
        {
          itemId: ItemId,
          name: ItemName,
          qty: Number(ItemQty),
          purchase: Number(
            ItemState.data.find((dt) => dt.code === ItemCode).purchase
          ),
          price: Number(ItemPrice),
          amount: Number(ItemTotal),
        },
      ]);
      setItemCode("");
      setItemName("");
      setItemId("");
      setItemQty("");
      setItemPrice("");
      setItemTotal("");
      itemCodeInputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-x-2 flex-wrap">
        <CustomPopOver
          label={"Select Customer"}
          placeholder={"Select Customer"}
          required={false}
          Value={
            CustomerState.data.find((dt) => dt._id === CurrentCustomer)?.name ||
            "Select Customer"
          }
          onClick={handleClick}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: "25px", // Add rounded corners
              backgroundColor: "white", // Set background color to white
              width: "300px", // Set the width as needed
              overflow: "hidden", // Hide overflowing content
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography
            sx={{
              p: 2,
              borderColor: "#000",
              backgroundColor: "#000",
              width: "400px",
              overflow: "hidden",
              borderRadius: "25px",
            }}
          >
            <div className="bg-[#000] text-white font-[Quicksand] flex flex-col justify-center items-center rounded-[50px]">
              <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                {CustomerState.data.map((dt) => (
                  <div
                    key={dt._id}
                    className="flex gap-x-3 items-center cursor-pointer"
                    onClick={() => handleCustomerSelect(dt)}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={CurrentCustomer === dt._id}
                      readOnly
                    />
                    <span>{dt.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Typography>
        </Popover>
        {CurrentCustomer && (
          <CustomInput
            id="bill-no"
            Type="number"
            label="Bill No"
            placeholder="Enter Bill #"
            Value={BillNo}
            setValue={setBillNo}
            required
          />
        )}
      </div>
      {!BillNoExists && (
        <div className="flex flex-col">
          <div className="flex gap-x-3 flex-wrap gap-y-3 justify-center items-center py-4 w-full border-b-2 border-b-white">
            <input
              type="text"
              list="item-code"
              id="fruit"
              name="fruit"
              value={ItemCode}
              onChange={(e) => setItemCode(e.target.value.toUpperCase())}
              placeholder="Select Code"
              className="px-2 py-2 outline-none rounded-lg border-[#000] border-2"
              onBlur={(e) => {
                const currentItem = ItemState.data.find(
                  (dt) => dt.code === e.target.value.toUpperCase()
                );
                if (!currentItem) setItemCode("");
              }}
              ref={itemCodeInputRef}
            />
            <datalist id="item-code">
              {ItemState.data &&
                ItemState.data.map((option) => (
                  <option key={option._id} value={option.code} />
                ))}
            </datalist>
            <input
              type="text"
              value={ItemName}
              disabled
              className="bg-white px-2 py-2 outline-none rounded-lg border-[#000] border-2"
              placeholder="Item Name"
            />
            <input
              type="number"
              value={ItemQty}
              onChange={(e) => {
                setItemQty(e.target.value);
                if (e.target.value === "") {
                  setItemTotal("");
                } else {
                  setItemTotal(Number(ItemPrice) * Number(e.target.value));
                }
              }}
              onBlur={(e) => {
                if (Number(e.target.value) > CurrentItemQty) {
                  WarningToast(
                    `Quantity must be less than or equal to ${CurrentItemQty}`
                  );
                  setItemQty("");
                  setItemTotal("");
                }
              }}
              placeholder="Enter Quantity"
              className="px-2 py-2 outline-none rounded-lg border-[#000] border-2"
            />
            <input
              type="number"
              value={ItemPrice}
              onChange={(e) => {
                setItemPrice(e.target.value);
                setItemTotal(Number(e.target.value) * Number(ItemQty));
              }}
              className="bg-white px-2 py-2 outline-none rounded-lg border-[#000] border-2"
              placeholder="Unit Price"
            />
            <input
              type="number"
              value={ItemTotal}
              disabled
              className="bg-white px-2 py-2 outline-none rounded-lg  border-[#000] border-2"
              placeholder="Total Amount"
            />
            <button
              className="bg-white text-[#000] px-3 py-2 border-2 border-[#000] hover:bg-[#000] hover:text-white hover:rounded-lg transition-all ease-in-out duration-500 font-bold"
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
