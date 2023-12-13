"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AddressInput from "../../../components/layout/AddressInput";
import CartProduct from "@/components/menu/CartProduct";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      fetch("/api/orders?_id=" + id).then((response) => {
        response.json().then((orderData) => {
          setOrder(orderData);
        });
      });
    }
  }, [clearCart, id]);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order!</p>
          <p>We will let you know when your order is on the way.</p>
        </div>
      </div>
      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct product={product} key={product.id} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:{" "}
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
              <br />
              Delivery:{" "}
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:{" "}
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInput disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
