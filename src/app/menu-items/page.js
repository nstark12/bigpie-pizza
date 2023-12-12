"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState("");
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user information...";
  }

  if (!data.admin) {
    return "Not authorized";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8 flex">
        <Link className="button" href={"/menu-items/new"}>
          Create New Menu Item
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit Menu Item</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <div key={item._id} className="bg-gray-200 rounded-lg p-4">
                <Link href={"/menu-items/edit/" + item._id}>
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </div>
                  <div className="text-center">{item.name}</div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
