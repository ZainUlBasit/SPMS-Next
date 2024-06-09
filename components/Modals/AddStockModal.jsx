"use client";
import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import { FormControl, Select, MenuItem, TextField } from "@mui/material";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import ProcessLoader from "../Loader/ProcessLoader";
import { fetchItems } from "@/utils/Slices/ItemSlice";
import { UpdateItemQtyApi } from "@/Https";
import { ErrorToast, SuccessToast } from "@/utils/ShowToast";

const AddStockModal = ({ OpenModal, setOpenModal }) => {
  const [ItemId, setItemId] = useState("");
  const [NewStock, setNewStock] = useState("");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!ItemId || !NewStock) {
      ErrorToast("Required fields are undefined");
      setLoading(false); // Ensure to reset loading state
    } else {
      try {
        // Your API call logic here
        const response = await UpdateItemQtyApi({
          itemId: ItemId,
          qty: Number(NewStock),
        });
        if (response.data.success) {
          SuccessToast(response.data.data.msg);
          dispatch(fetchItems());
          setOpenModal(false);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  const ItemState = useSelector((state) => state.ItemState);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <ModalWrapper open={OpenModal} setOpen={setOpenModal} title={"Add Stock"}>
      <div className="flex justify-center flex-col py-5">
        <FormControl sx={{ m: 1, width: "40ch" }}>
          <Select
            value={ItemId}
            onChange={(event) => setItemId(event.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Select Item" }}
          >
            <MenuItem value="" disabled>
              Select Item
            </MenuItem>
            {!ItemState.loading &&
              ItemState.data.map((dt) => (
                <MenuItem key={dt._id} value={dt._id}>
                  {dt.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            type="number"
            value={NewStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
        </FormControl>
        <div className="w-full flex justify-center mt-5">
          {Loading ? (
            <ProcessLoader />
          ) : (
            <button
              onClick={handleSubmit}
              className="w-[80%] hover:bg-[#394B92] py-3 hover:text-white border-2 border-[#394B92] text-[#394B92] font-[900] text-xl hover:rounded-xl transition-all ease-in-out duration-500"
            >
              Add Stock
            </button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddStockModal;
