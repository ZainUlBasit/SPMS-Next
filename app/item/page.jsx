"use client";
import { DeleteItemApi } from "@/Https";
import PageLoader from "@/components/Loader/PageLoader";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditItem from "@/components/Modals/EditItem";
import Search from "@/components/Search/Search";
import ItemInfoTable from "@/components/Tables/ItemInfoTable";
import TableComp from "@/components/Tables/TableComponent";
import TableWrapper from "@/components/Tables/TableWrapper";
import { fetchItems } from "@/utils/Slices/ItemSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ItemInfo() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [SearchText, setSearchText] = useState("");
  const [ItemId, setItemId] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const ItemState = useSelector((state) => state.ItemState);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Handle edit modal close
  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setItemId("");
  };

  // Handle delete modal close
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    setItemId("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-end mb-5 w-[80%]">
        <div
          className="px-3 py-2 border-2 border-black rounded-full cursor-pointer hover:bg-black hover:text-white transition-all ease-in-out duration-500"
          onClick={() => {
            router.push("/item/bar-codes");
          }}
        >
          Generate Bar Code
        </div>
      </div>
      {ItemState.loading ? (
        <PageLoader />
      ) : (
        ItemState.data && (
          <div className="w-[90%]">
            <TableComp title="ITEMS INFO" rows={ItemState.data} />
          </div>
        )
      )}
    </div>
  );
}
