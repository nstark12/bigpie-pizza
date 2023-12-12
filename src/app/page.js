import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 " id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-lg mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
            non quis exercitationem culpa nesciunt nihil aut nostrum explicabo
            reprehenderit optio amet ab temporibus asperiores quasi cupiditate.
            Voluptatum ducimus voluptates voluptas?{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
            non quis exercitationem culpa nesciunt nihil aut nostrum explicabo
            reprehenderit optio amet ab temporibus asperiores quasi cupiditate.
            Voluptatum ducimus voluptates voluptas?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
            non quis exercitationem culpa nesciunt nihil aut nostrum explicabo.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+1555555555"
          >
            +1 555 555 5555
          </a>
        </div>
      </section>
    </>
  );
}
