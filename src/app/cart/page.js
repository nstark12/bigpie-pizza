"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useContext, useEffect, useState } from "react";
import AddressInput from "@/components/layout/AddressInput";
import { useProfile } from "@/components/UseProfile";
import Trash from "@/components/icons/Trash";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, country, postalCode } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        country,
        postalCode,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const product of cartProducts) {
    subtotal += cartProductPrice(product);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => {
      return { ...prevAddress, [propName]: value };
    });
  }

  async function proceedToCheckout(e) {
    e.preventDefault();

    const promise = new Promise(async (resolve, reject) => {
      await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ address, cartProducts }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Error connecting to payment",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8">
        <div className="text-center">
          <SectionHeaders mainHeader={"Cart"} />
          <p className="mt-4">Your shopping cart is empty</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart!</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <>
                <div
                  key={product._id}
                  className="flex gap-4 mb-2 border-b py-2 items-center"
                >
                  <div className="w-24">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={240}
                      height={240}
                    />
                  </div>
                  <div className="grow">
                    <h3>{product.name}</h3>
                    {product.size && (
                      <div className="text-sm text-gray-500 font-semibold">
                        Size: <span>{product.size.name}</span>
                      </div>
                    )}
                    {product.extras?.length > 0 && (
                      <div className="mt-2 text-sm">
                        Add-Ons:
                        {product.extras.map((extra) => (
                          <div key={extra.name} className="text-gray-500">
                            {extra.name} ${extra.price}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-semibold">
                    ${cartProductPrice(product)}
                  </div>

                  <div className="ml-2">
                    <button
                      className="p-2"
                      type="button"
                      onClick={() => removeCartProduct(index)}
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              </>
            ))}
          <div className="py-2 pr-16 flex justify-end items-center ">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${subtotal}
              <br />
              $5
              <br />${subtotal + 5}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInput
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
