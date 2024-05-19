import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { FormControl, TextField } from "@mui/material";
import Joi from "joi";
import { SuccessToast, WarningToast } from "@/utils/ShowToast";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { CreateCompanyApi, UpdateCompanyApi } from "@/Https";
import { useDispatch } from "react-redux";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import { successMessage } from "@/utils/ResponseMessage";
import ProcessLoader from "../Loader/ProcessLoader";

const EditCompany = ({ open, setOpen, CurrentCompany }) => {
  const [Name, setName] = useState(CurrentCompany.name);
  const [Contact, setContact] = useState(CurrentCompany.contact);
  const [Email, setEmail] = useState(CurrentCompany.email);
  const [Cnic, setCnic] = useState(CurrentCompany.cnic);
  const [Desc, setDesc] = useState(CurrentCompany.desc);
  const [Address, setAddress] = useState(CurrentCompany.address);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const schema = Joi.object({
      Name: Joi.string().required(),
      Contact: Joi.string().required(),
      Email: Joi.string().required(),
      Cnic: Joi.string().required(),
      Desc: Joi.string().required(),
      Address: Joi.string().required(),
    });

    // Validate input values
    const { error } = schema.validate({
      Name,
      Contact: Contact.toString(),
      Email,
      Cnic: Cnic.toString(),
      Desc,
      Address,
    });

    if (error) {
      alert(error.message);
    } else {
      try {
        const response = await UpdateCompanyApi({
          name: Name,
          contact: Contact.toString(),
          email: Email,
          cnic: Cnic.toString(),
          desc: Desc,
          address: Address,
          companyId: CurrentCompany._id,
        });
        if (response.data.success) {
          successMessage(response.data.data.msg);
          dispatch(fetchCompanies());
          setOpen(false);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };
  return (
    <ModalWrapper open={open} setOpen={setOpen} title={"Edit Company"}>
      <div className="flex justify-center flex-col py-5">
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Contact"
            variant="outlined"
            type="number"
            value={Contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="CNIC"
            variant="outlined"
            value={Cnic}
            type="number"
            onChange={(e) => setCnic(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            type="text"
            value={Desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
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
              Update Company
            </button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditCompany;
