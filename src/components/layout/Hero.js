import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-14">
        <h1 className="text-4xl font-semibold">
          Everything
          <br />
          is better
          <br />
          with a <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary uppercase items-center flex justify-center gap-2 text-white py-2 rounded-full">
            Order Now
            <Right />
          </button>
          <button className="flex gap-2 border-0 text-gray-600 items-center font-semibold py-2">
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src={"/pizza.png"}
          alt={"pizza"}
          layout={"fill"}
          objectFit={"contain"}
        />
      </div>
    </section>
  );
}
