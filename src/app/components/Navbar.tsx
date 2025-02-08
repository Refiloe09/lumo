"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
  const [navFixed, setNavFixed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false); // ✅ Prevent hydration mismatch

  useEffect(() => {
    setHydrated(true); // ✅ Ensures component is mounted before applying scroll effect
    const handleScroll = () => {
      setNavFixed(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Ensure styles do not change before hydration
  const navClass = hydrated
    ? `w-full px-6 md:px-24 flex justify-between items-center py-4 top-0 z-50 transition-all duration-300 ${
        navFixed ? "fixed bg-lumo-dark shadow-md border-b border-lumo-gray-600" : "absolute bg-lumo-dark"
      }`
    : "w-full px-6 md:px-24 flex justify-between items-center py-4 top-0 z-50 transition-all duration-300 bg-lumo-dark";

  return (
    <>
      {/* ✅ Desktop Navbar */}
      <motion.nav
        className={navClass}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* ✅ Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Lumo" width={120} height={40} priority />
        </Link>

        {/* ✅ Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
        <li><Link href="/" className="hover:text-lumo-accent transition">Explore</Link></li>
          <li><Link href="/how-it-works" className="hover:text-lumo-accent transition">How It Works</Link></li>
          <li><Link href="/pricing" className="hover:text-lumo-accent transition">Pricing & Fees</Link></li>
          {/* <li><Link href="/blog" className="hover:text-lumo-accent transition">Blog</Link></li>
          <li><Link href="/resources" className="hover:text-lumo-accent transition">SMME Resources</Link></li>
          <li><Link href="/help-center" className="hover:text-lumo-accent transition">Help Center</Link></li> */}
        </ul>

        {/* ✅ Auth & Mobile Menu */}
        <div className="flex items-center gap-6">
          <SignedOut>
            <SignInButton>
              <button className="text-white hover:text-lumo-accent transition">Sign in</button>
            </SignInButton>
            <SignUpButton>
              <button className="border border-lumo-primary text-lumo-primary px-4 py-1.5 rounded-md hover:bg-lumo-primary hover:text-white transition">
                Join
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link href="/orders" className="text-white hover:text-lumo-accent transition">Orders</Link>
            <Link href="/seller/services/create" className="text-lumo-primary font-medium">Create Service</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* ✅ Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <IoMenu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* ✅ Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-lumo-dark bg-opacity-95 flex flex-col items-center justify-center text-white z-50"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4 }}
          >
            <button className="absolute top-6 right-6 text-white" onClick={() => setMobileMenuOpen(false)}>
              <IoClose size={32} />
            </button>
            <ul className="flex flex-col gap-6 text-lg font-semibold">
              <li><Link href="/how-it-works" className="hover:text-lumo-accent transition" onClick={() => setMobileMenuOpen(false)}>How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-lumo-accent transition" onClick={() => setMobileMenuOpen(false)}>Pricing & Fees</Link></li>
              <li><Link href="/blog" className="hover:text-lumo-accent transition" onClick={() => setMobileMenuOpen(false)}>Blog</Link></li>
              <li><Link href="/resources" className="hover:text-lumo-accent transition" onClick={() => setMobileMenuOpen(false)}>SMME Resources</Link></li>
              <li><Link href="/help-center" className="hover:text-lumo-accent transition" onClick={() => setMobileMenuOpen(false)}>Help Center</Link></li>
            </ul>

            {/* ✅ Mobile Auth */}
            <div className="mt-8">
              <SignedOut>
                <SignInButton>
                  <button className="text-white border border-lumo-primary px-6 py-2 rounded-md hover:bg-lumo-primary transition">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="ml-4 bg-lumo-primary text-white px-6 py-2 rounded-md hover:bg-lumo-accent transition">
                    Join
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/orders" className="text-white hover:text-lumo-accent transition">Orders</Link>
                <Link href="/seller/services/create" className="text-lumo-primary font-medium">Create Service</Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
