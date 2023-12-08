"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify({ name: userName, image }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  async function handleFileChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setImage(link);
          });
        }
        throw new Error("Error");
      });
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete!",
        error: "Upload error",
      });
    }
  }

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-full relative max-w-[120px]">
              {image && (
                <Image
                  className="rounded-full w-full h-full"
                  src={image}
                  alt={"avatar"}
                  width={250}
                  height={250}
                />
              )}
            </div>
            <label>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="border border-gray-300 block rounded-full px-2 py-1 cursor-poitner text-center">
                Edit Image
              </span>
            </label>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input type="email" value={session.data.user.email} disabled />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
