"use client";
import { useProfile } from "../../../components/UseProfile";
import { useState } from "react";
import UserTabs from "../../../components/layout/UserTabs";
import MenuItemForm from "@/components/layout/MenuItemForm";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();

  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(e, data) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error saving",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading user information...";
  }

  if (!data.admin) {
    return "Not authorized...";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link className="button" href={"/menu-items"}>
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
