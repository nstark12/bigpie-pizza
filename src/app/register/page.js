"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    // setUserCreated(true);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created.
          <br /> Now you can{" "}
          <Link className="underline text-primary" href={"/login"}>
            Login!
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred. <br />
          Please try again later.
        </div>
      )}
      <form onSubmit={handleFormSubmit} className="block max-w-xs mx-auto">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          Or login with provider
        </div>
        <button className="flex gap-4 justify-center items-center">
          <Image
            src={"/google.png"}
            alt={"google logo"}
            width={24}
            height={24}
          />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Already have an account?{" "}
          <Link className="underline text-primary" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
