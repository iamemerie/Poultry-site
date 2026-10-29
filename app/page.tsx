import Image from "next/image";
import Navbar from "./components/Navbar";
import Species from "./components/Species";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import AboutFarm from "./components/AboutFarm";
import Link from "next/link";
import StockSummary from "./components/StockSummary";
import { Suspense } from "react";

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
              <Link
                href="/sign-up"
                className="self-start rounded-full bg-brand px-6 py-4 text-base font-medium text-cream transition hover:bg-brand-dark"
              >
                Create an account <span className="font-bold">→</span>
              </Link>
            </div>
          </div>
        </section>
        <Suspense
          fallback={
            <section className="mx-auto max-w-4xl px-6 py-20">
              <div className="mx-auto h-56 w-56 animate-pulse rounded-full bg-cream" />
            </section>
          }
        >
          <StockSummary />
        </Suspense>
        <Species />
        <AboutFarm />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
