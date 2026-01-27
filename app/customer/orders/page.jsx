"use client";
import { ApproveOrderApi, GetOrdersApi, RejectOrderApi } from "@/Https";
import PageLoader from "@/components/Loader/PageLoader";
import ProcessLoader from "@/components/Loader/ProcessLoader";
import Search from "@/components/Search/Search";
import TableWrapper from "@/components/Tables/TableWrapper";
import { ErrorToast, SuccessToast } from "@/utils/ShowToast";
import { Button } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("PENDING");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = { status: statusFilter };
      const response = await GetOrdersApi(params);
      console.log("Orders API Response:", response.data);
      if (response.data.success) {
        const ordersData = response.data.data.payload || [];
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } else {
        console.error("API returned success=false:", response.data);
        ErrorToast(response.data.error?.message || "Failed to fetch orders");
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      console.error("Error details:", err.response?.data);
      ErrorToast(err.response?.data?.error?.message || "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleApprove = async (orderId) => {
    if (!confirm("Are you sure you want to approve this order?")) return;

    setProcessing(true);
    try {
      const response = await ApproveOrderApi({ orderId });
      if (response.data.success) {
        SuccessToast("Order approved successfully!");
        fetchOrders();
      }
    } catch (err) {
      console.error("Error approving order:", err);
      ErrorToast(err.response?.data?.data?.msg || "Failed to approve order");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (orderId) => {
    const reason = prompt("Enter rejection reason (optional):");
    if (reason === null) return; // User cancelled

    setProcessing(true);
    try {
      const response = await RejectOrderApi({
        orderId,
        rejectionReason: reason || "No reason provided",
      });
      if (response.data.success) {
        SuccessToast("Order rejected successfully!");
        fetchOrders();
      }
    } catch (err) {
      console.error("Error rejecting order:", err);
      ErrorToast(err.response?.data?.data?.msg || "Failed to reject order");
    } finally {
      setProcessing(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (!searchText) return true;
    const searchLower = searchText.toLowerCase();
    return (
      order.customerId?.name?.toLowerCase().includes(searchLower) ||
      order.invoice_no?.toString().includes(searchText) ||
      order.customerId?.phone?.includes(searchText) ||
      order.customerId?.contact?.includes(searchText)
    );
  });

  if (loading) return <PageLoader />;

  return (
    <div className="flex justify-center items-center">
      <TableWrapper>
        <div className="flex gap-4 mb-4 items-center">
          <Search
            Placeholder="Search by customer name, invoice number, or phone..."
            Value={searchText}
            setValue={setSearchText}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {processing && <ProcessLoader />}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Invoice #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Discount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap border">
                      {order.invoice_no}
                    </td>
                    <td className="px-4 py-3 border">
                      <div>
                        <div className="font-medium">
                          {order.customerId?.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerId?.phone || order.customerId?.contact || ""}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap border">
                      {moment.unix(order.date).format("YYYY-MM-DD")}
                    </td>
                    <td className="px-4 py-3 border">
                      <div className="text-sm">
                        {order.items?.length || 0} item(s)
                        <details className="mt-1">
                          <summary className="cursor-pointer text-blue-600">
                            View items
                          </summary>
                          <ul className="list-disc list-inside mt-1 text-xs">
                            {order.items?.map((item, idx) => (
                              <li key={idx}>
                                {item.itemId?.name || item.itemId?.code || "N/A"} - Qty: {item.qty} @ {item.price}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap border">
                      {order.total_amount?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap border">
                      {order.discount?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap border">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap border">
                      {order.status === "PENDING" && (
                        <div className="flex gap-2">
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleApprove(order._id)}
                            disabled={processing}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleReject(order._id)}
                            disabled={processing}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      {order.status === "APPROVED" && (
                        <span className="text-sm text-green-600">
                          Approved {order.approvedAt && moment.unix(order.approvedAt).format("MM/DD/YY")}
                        </span>
                      )}
                      {order.status === "REJECTED" && (
                        <div className="text-sm text-red-600">
                          <div>Rejected</div>
                          {order.rejectionReason && (
                            <div className="text-xs text-gray-500">
                              {order.rejectionReason}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TableWrapper>
    </div>
  );
}
