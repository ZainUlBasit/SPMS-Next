"use client";
import AddStockModal from "@/components/Modals/AddStockModal";
import ItemNavs from "@/components/Navigations/ItemNavs";
import { useState } from "react";

export default function ItemLayout({ children }) {
  const [OpenAddStock, setOpenAddStock] = useState(false);
  return (
    <div>
      <ItemNavs setOpenAddStock={setOpenAddStock} />
      {OpenAddStock && (
        <AddStockModal
          OpenModal={OpenAddStock}
          setOpenModal={setOpenAddStock}
        />
      )}
      {children}
    </div>
  );
}
