"use client";
import PageLoader from "@/components/Loader/PageLoader";
import { fetchItems } from "@/utils/Slices/ItemSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";

export default function Page() {
  const dispatch = useDispatch();
  const ItemState = useSelector((state) => state.ItemState);
  const refs = useRef([]);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const pageStyle = `
    @page {
      size: 30mm 20mm; /* Set this to your label size */
      margin: 0; /* No margin for label printing */
    }
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      .label {
        page-break-after: always; /* Ensure each label is printed on a new page */
      }
    }
  `;

  return (
    <div className="flex flex-col justify-center items-center">
      {ItemState.loading ? (
        <PageLoader />
      ) : (
        ItemState.data &&
        ItemState.data.map((dt, index) => (
          <div key={dt.id} className="label">
            <Barcode
              value={dt.code}
              ref={(el) => (refs.current[index] = el)}
              height={40}
              width={1}
            />
            <ReactToPrint
              trigger={() => <button>Print</button>}
              content={() => refs.current[index]}
              pageStyle={pageStyle}
            />
          </div>
        ))
      )}
    </div>
  );
}
