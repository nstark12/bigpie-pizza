"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { loading, data } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
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
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users.length > 0 &&
          users.map((user) => (
            <div
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 md:flex items-center gap-4"
              key={user._id}
            >
              <div className="grid md:grid-cols-3 gap-4 grow">
                <div className="text-gray-600">
                  {user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic ">No Name</span>}
                </div>
                <span className="text-gray-400">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
