"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  if (loading) {
    return "Loading user information...";
  }

  if (!data.admin) {
    return "Not authorized";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8 flex">
        <Link className="button" href={"/menu-items/new"}>
          Create New Menu Item
          <Right />
        </Link>
      </div>
    </section>
  );
}
