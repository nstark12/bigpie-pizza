"use client";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "../../libs/datetime";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders").then((response) => {
      response.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && <div>Loading Orders...</div>}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg sm:flex items-center gap-4"
            >
              <div className="grow flex items-center gap-4">
                <div>
                  <div
                    className={
                      order.paid
                        ? "bg-green-500 text-white p-2 rounded-md w-24 text-center whitespace-nowrap"
                        : "bg-red-500 text-white p-2 rounded-md whitespace-nowrap w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not Paid"}
                  </div>
                </div>
                <div className=" text-sm">
                  <div>{order.userEmail}</div>
                  <div className="text-gray-600 text-xs">
                    {dbTimeForHuman(order.createdAt)}
                  </div>
                  <div className="text-gray-500">
                    {order.cartProducts
                      .map((product) => product.name)
                      .join(", ")}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 items-center">
                <Link className="button" href={"/orders/" + order._id}>
                  Show Order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
