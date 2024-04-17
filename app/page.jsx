"use client";
import Image from "next/image";
import Logo from "@/public/logo.png";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/home");
    // Add your form submission logic here
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="h-fit shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px] flex justify-center items-center flex-col p-5 px-5 rounded-xl">
        <Image src={Logo} className="w-[300px] h-[300px]" />
        <div className="font-bold text-3xl my-2">Admin Sign In</div>

        <div className="flex flex-col items-center justify-center">
          <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <div className="w-full flex justify-center my-5">
            <button
              onClick={handleSubmit}
              className="w-[90%] hover:bg-[#394B92] py-3 hover:text-white border-2 border-[#394B92] text-[#394B92] font-[900] text-xl hover:rounded-xl transition-all ease-in-out duration-500"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
