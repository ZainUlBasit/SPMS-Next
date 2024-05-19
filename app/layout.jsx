import { Inter } from "next/font/google";
import "./globals.css";

import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import ProtectedRoutes from "@/components/Wrapper/ProtectedRoutes";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Toaster position="top-right" reverseOrder={false} />
        <StoreProvider>
          <ProtectedRoutes>{children}</ProtectedRoutes>
        </StoreProvider>
      </body>
    </html>
  );
}