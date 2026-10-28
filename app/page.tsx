import Image from "next/image";
import Navbar from "./components/Nav";
import Species from "./components/Species";
import Footer from "./components/Footer";
import PreorderSection from "./components/PreorderSection";
import Testimonials from "./components/Testimonials";
import AboutFarm from "./components/AboutFarm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative h-[70vh] min-h-[480px] overflow-x-hidden">
          <Image
            src="/ee.jpg"
            alt="Brown free-range hens walking in green grass"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
          {/* content */}
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center gap-3 px-6">
            <h2 className="font-heading text-4xl font-extrabold text-white">
              <span className="text-accent">Best</span> poultry farm for <br />
              <span className="text-accent">healthy</span> meats & eggs
            </h2>
            <p className="text-white">Healthy poultry, laid with care.</p>
            <div className="flex gap-3">
              <button className="self-start rounded-full font-medium font-logo bg-brand px-6 py-4 text-md text-white transition hover:bg-accent-dark md:inline-block">
                Create an account<span className="font-bold"> →</span>
              </button>
            </div>
          </div>
        </section>
        <Species />
        <AboutFarm />
        <Testimonials />
        <PreorderSection />
      </main>
      <Footer />
    </>
  );
}
