"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import Cart from "@/components/icons/Cart";
import Hamburger from "@/components/icons/Hamburger";

export default function Header() {
  const session = useSession();
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const status = session?.status;
  const { cartProducts } = useContext(CartContext);

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <>
      <header>
        <div className="md:hidden flex items-center justify-between ">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            bigPie Pizza
          </Link>
          <div className="flex gap-4 items-center">
            <Link className="relative" href={"/cart"}>
              <Cart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary border-white text-white text-xs py-1 px-2 rounded-full leading-3">
                  {" "}
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button className="p-1 text-white bg-primary">
              <Hamburger />
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between">
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link className="text-primary font-semibold text-2xl" href={"/"}>
              bigPie Pizza
            </Link>
            <Link href={"/"}>Home</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/#about"}>About</Link>
            <Link href={"/#contact"}>Contact</Link>
          </nav>
          <nav className="flex items-center gap-4 text-gray-500 font-semibold">
            {status === "authenticated" && (
              <>
                <Link className="whitespace-nowrap" href={"/profile"}>
                  Hello, {userName}
                </Link>
                <button
                  className="bg-primary text-white px-8 py-2 rounded-full"
                  href={"/register"}
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <Link href={"/login"}>Login</Link>
                <Link
                  className="bg-primary text-white px-8 py-2 rounded-full"
                  href={"/register"}
                >
                  Register
                </Link>
              </>
            )}
            <Link className="relative" href={"/cart"}>
              <Cart />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-2 rounded-full leading-3">
                  {" "}
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
