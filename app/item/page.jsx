"use client";
import { DeleteItemApi } from "@/Https";
import PageLoader from "@/components/Loader/PageLoader";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditItem from "@/components/Modals/EditItem";
import Search from "@/components/Search/Search";
import ItemInfoTable from "@/components/Tables/ItemInfoTable";
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
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-end mb-5 w-[80%]">
        <div
          className="px-3 py-2 border-2 border-black rounded-full cursor-pointer hover:bg-black hover:text-white transition-all ease-in-out duration-500"
          onClick={() => {
            console.log("check");
            router.push("/item/bar-codes");
          }}
        >
          Generate Bar Code
        </div>
      </div>
      {ItemState.loading ? (
        <PageLoader />
      ) : (
        <TableWrapper>
          <Search
            Placeholder="Search Item..."
            Value={SearchText}
            setValue={setSearchText}
          />
          <ItemInfoTable
            setID={setItemId}
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            SearchText={SearchText}
            Rows={ItemState.data}
          />
        </TableWrapper>
      )}
      {OpenEditModal && (
        <EditItem
          open={OpenEditModal}
          setOpen={setOpenEditModal}
          CurrentItem={ItemState.data.find((dt) => dt._id === ItemId)}
        />
      )}
      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={async () => {
            setLoading(true);
            try {
              const response = await DeleteItemApi({ itemId: ItemId });
              if (response.data.success) {
                SuccessToast(response.data.data.msg);
                setOpenDeleteModal(false);
                dispatch(fetchItems());
              }
            } catch (err) {
              console.log(err);
            }
            setLoading(false);
          }}
          Loading={Loading}
        />
      )}
    </div>
  );
}
