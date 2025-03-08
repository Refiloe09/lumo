"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import SearchBox from "../ServiceSearch";

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center bg-lumo-light">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/girlboss.jpg"
          alt="Entrepreneur working on a laptop"
          fill
          className="object-cover opacity-90"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lumo-dark/60 to-lumo-dark/90"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-display font-bold leading-tight"
        >
          Empowering SMMEs, One Service at a Time.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="mt-4 text-lg md:text-xl text-lumo-accent"
        >
          Find the right services to grow your business—from legal assistance to marketing & tech solutions.
        </motion.p>
        <SearchBox />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="mt-8 flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link
            href="/search"
            className="bg-lumo-primary text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-lumo-secondary transition-all"
          >
            Browse Services
          </Link>
          <Link
            href="/how-it-works"
            className="border border-lumo-primary text-lumo-primary px-6 py-3 rounded-lg font-medium hover:bg-lumo-primary hover:text-white transition-all"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
