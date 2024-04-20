import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";

const CreateItem = ({ open, setOpen }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [desc, setDesc] = useState("");
  const [purchase, setPurchase] = useState("");
  const [sale, setSale] = useState("");

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleSubmit = (e) => {
    // Handle form submission logic here
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen} title={"Create Item"}>
      <div className="flex justify-center flex-col py-5">
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }}>
          <Select
            value={company}
            onChange={handleCompanyChange}
            displayEmpty
            inputProps={{ "aria-label": "Select Company" }}
          >
            <MenuItem value="" disabled>
              Select Company
            </MenuItem>
            {/* Replace the options below with your actual company options */}
            <MenuItem value="company1">Company 1</MenuItem>
            <MenuItem value="company2">Company 2</MenuItem>
            <MenuItem value="company3">Company 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Purchase"
            variant="outlined"
            type="number"
            value={purchase}
            onChange={(e) => setPurchase(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Sale"
            variant="outlined"
            type="number"
            value={sale}
            onChange={(e) => setSale(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </FormControl>
        <div className="w-full flex justify-center mt-5">
          <button
            onClick={handleSubmit}
            className="w-[80%] hover:bg-[#394B92] py-3 hover:text-white border-2 border-[#394B92] text-[#394B92] font-[900] text-xl hover:rounded-xl transition-all ease-in-out duration-500"
          >
            Create Item
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CreateItem;
