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

  // Fetch items when the component is mounted
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Handle closing modals to avoid any unexpected errors
  const closeEditModal = () => setOpenEditModal(false);
  const closeDeleteModal = () => setOpenDeleteModal(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-end mb-5 w-[80%]">
        <div
          className="px-3 py-2 border-2 border-black rounded-full cursor-pointer hover:bg-black hover:text-white transition-all ease-in-out duration-500"
          onClick={() => router.push("/item/bar-codes")}
        >
          Generate Bar Code
        </div>
      </div>

      {/* Show loader if the state is still loading */}
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

      {/* Modal rendering, with key to ensure proper re-rendering */}
      {OpenEditModal && (
        <EditItem
          key="edit-item-modal"
          open={OpenEditModal}
          setOpen={closeEditModal}
          CurrentItem={ItemState.data.find((dt) => dt._id === ItemId)}
        />
      )}

      {OpenDeleteModal && (
        <DeleteModal
          key="delete-item-modal"
          Open={OpenDeleteModal}
          setOpen={closeDeleteModal}
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
              console.error("Delete error:", err);
            }
            setLoading(false);
          }}
          Loading={Loading}
        />
      )}
    </div>
  );
}
