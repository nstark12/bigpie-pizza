"use client";
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
  }, [clearCart]);
  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" />
        <div className="my-4">
          <p>Thanks for your order!</p>
          <p>We will let you know when your order is on the way.</p>
        </div>
      </div>
    </section>
  );
}
