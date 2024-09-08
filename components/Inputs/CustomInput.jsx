import React, { useState } from "react";
import TextField from "@mui/material/TextField";
// import { v4 } from "uuid";
import "./CustomInput.css";
import { validateEmail, validateName } from "@/utils/Validations";

const CustomInput = ({
  id,
  Type,
  label,
  placeholder,
  required,
  Value,
  setValue,
  readonly,
  disabled,
}) => {
  const [InvalidEntry, setInvalidEntry] = useState(false);
  return (
    <div className="relative w-[300px] maxInputWidth font-[Quicksand] h-[48px]">
      <p className="absolute top-[-11px] left-3 w-fit bg-white h-[13px] text-[15px] font-bold InputLabel">
        {label}
      </p>
      <input
        type={Type ? Type : "text"}
        required={required}
        id={id}
        placeholder={placeholder}
        className={`px-3 py-2 border border-[#000] rounded-[7.94px] w-full outline-none InputText shadow-[#0e25802d_0px_2px_8px_0px] font-bold text-[15px] placeholder:font-normal h-full ${
          InvalidEntry && "border-red-500"
        }`}
        value={Value}
        readOnly={readonly ? true : false}
        onChange={(e) => {
          const value = e.target.value;
          setValue(value.length ? value : "");
        }}
        onBlur={(e) => {
          if (label === "Name" && !validateName(e.target.value)) {
            setInvalidEntry(true);
          }
          if (label === "Name" && validateName(e.target.value)) {
            setInvalidEntry(false);
          }
          if (label === "Email" && !validateEmail(e.target.value)) {
            setInvalidEntry(true);
          }
          if (label === "Email" && validateEmail(e.target.value)) {
            setInvalidEntry(false);
          }
        }}
        disabled={disabled ? disabled : false}
      />
    </div>
  );
};

export default CustomInput;
