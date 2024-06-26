"use client";
import { CashLedgerColumns } from "@/assets/Columns/CashLedgerColumns";
import { ItemLedgerColumns } from "@/assets/Columns/ItemLedgerColumns";
import ItemLedgerCard from "@/components/Cards/ItemLedgerCard";
import ProcessLoader from "@/components/Loader/ProcessLoader";
import SimpleTable from "@/components/Tables/SimpleTable";
import { fetchCompanies } from "@/utils/Slices/CompanySlice";
import { fetchCustomers } from "@/utils/Slices/CustomerSlice";
import { fetchPaymentById } from "@/utils/Slices/PaymentSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ComapnyLedger() {
  const [OpenItemLedger, setOpenItemLedger] = useState(false);
  const [OpenCashLedger, setOpenCashLedger] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [CurrentCustomer, setCurrentCustomer] = useState("");
  const CustomerState = useSelector((state) => state.CustomerState);
  const PaymentState = useSelector((state) => state.PaymentState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  useEffect(() => {
    if (OpenCashLedger)
      dispatch(
        fetchPaymentById({
          user_Id: CurrentCustomer,
          from_date: fromDate,
          to_date: toDate,
        })
      );
  }, [OpenCashLedger, fromDate, toDate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ItemLedgerCard
        setOpenCashLedger={setOpenCashLedger}
        setOpenItemLedger={setOpenItemLedger}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        Users={CustomerState.data}
        SelectUser={CurrentCustomer}
        setSelectUser={setCurrentCustomer}
        Placeholder={"Select Customer"}
      />
      {OpenItemLedger && (
        <SimpleTable
          columns={ItemLedgerColumns}
          title={"Item Ledger Details"}
          rows={[
            {
              date: "2023-06-01",
              billNumber: "INV-001",
              article: "Chair",
              size: "Medium",
              quantity: 10,
              price: 50,
              amount: 500,
            },
            {
              date: "2023-06-05",
              billNumber: "INV-002",
              article: "Table",
              size: "Large",
              quantity: 5,
              price: 100,
              amount: 500,
            },
            {
              date: "2023-06-10",
              billNumber: "INV-003",
              article: "Desk",
              size: "Small",
              quantity: 8,
              price: 80,
              amount: 640,
            },
          ]}
        />
      )}
      {OpenCashLedger && PaymentState.loading ? (
        <ProcessLoader />
      ) : (
        OpenCashLedger &&
        PaymentState.data && (
          <SimpleTable
            columns={CashLedgerColumns}
            title={"Cash Ledger Details"}
            rows={PaymentState.data}
          />
        )
      )}
    </div>
  );
}
