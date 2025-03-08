"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";
import SyncUserData from "./SyncUserData";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";

const Navbar = () => {
  const [navFixed, setNavFixed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [{ isSeller, userInfo }, dispatch] = useStateProvider(); // Ensure this hook is working

  // Set default to Buyer view on mount and handle scroll
  useEffect(() => {
    setHydrated(true);
    const handleScroll = () => setNavFixed(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle between Buyer and Seller views
  const handleModeSwitch = () => {
    console.log("Switching mode, current isSeller:", isSeller); // Debug log
    dispatch({ type: reducerCases.SWITCH_MODE });
    console.log("New isSeller after dispatch:", !isSeller); // Debug log
  };

  // Navigation links (static, adjusted dynamically based on isSeller)
  const desktopLinks = [
    { href: "/", label: "Explore", visible: true },
    { href: "/how-it-works", label: "How It Works", visible: true },
    { href: "/pricing", label: "Pricing & Fees", visible: true },
  ];

  const navClass = hydrated
    ? `w-full px-6 md:px-24 flex justify-between items-center py-4 top-0 z-50 transition-all duration-300 ${
        navFixed || userInfo
          ? "fixed bg-lumo-dark shadow-md border-b border-lumo-gray-600"
          : "absolute bg-lumo-dark"
      }`
    : "w-full px-6 md:px-24 flex justify-between items-center py-4 top-0 z-50 transition-all duration-300 bg-lumo-dark";

  return (
    <>
      <motion.nav
        className={navClass}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Lumo" width={120} height={40} priority />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-white font-medium items-center list-none">
          {desktopLinks.map(({ href, label, visible }) =>
            visible ? (
              <li key={label} className="px-2 list-none">
                <Link href={href} className="hover:text-lumo-accent transition">
                  {label}
                </Link>
              </li>
            ) : null
          )}
          <SignedIn>
            <li className="px-2 list-none">
              <Link
                href={isSeller ? "/seller/orders" : "/buyer/orders"}
                className="hover:text-lumo-accent transition"
              >
                Orders
              </Link>
            </li>
            {isSeller && (
              <li className="px-2">
                <Link
                  href="/seller/services/create"
                  className="text-lumo-primary font-medium hover:text-lumo-accent transition"
                >
                  Create Service
                </Link>
              </li>
            )}
            <li className="px-2 list-none">
              <button
                onClick={handleModeSwitch}
                className="text-white hover:text-lumo-accent transition font-medium"
              >
                {isSeller ? "Switch to Buyer" : "Switch to Seller"}
              </button>
            </li>
          </SignedIn>
        </ul>

        {/* Auth and Mobile Menu */}
        <div className="flex items-center gap-6">
          <SignedOut>
            <li className="list-none">
              <SignInButton>
                <button className="text-white hover:text-lumo-accent transition">
                  Sign in
                </button>
              </SignInButton>
            </li>
            <li className="list-none">
              <SignUpButton>
                <button className="border border-lumo-primary text-lumo-primary px-4 py-1.5 rounded-md hover:bg-lumo-primary hover:text-white transition">
                  Join
                </button>
              </SignUpButton>
            </li>
          </SignedOut>
          <SignedIn>
            <SyncUserData />
            <li className="list-none">
              <UserButton afterSignOutUrl="/" />
            </li>
          </SignedIn>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <IoMenu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-lumo-dark bg-opacity-95 flex flex-col items-center justify-start pt-20 text-white z-50"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4 }}
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <IoClose size={32} />
            </button>
            <ul className="flex flex-col gap-6 text-lg font-semibold w-full px-6 list-none">
              {desktopLinks.map(({ href, label, visible }) =>
                visible ? (
                  <li className="list-none" key={label}>
                    <Link
                      href={href}
                      className="hover:text-lumo-accent transition block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ) : null
              )}
              <SignedIn>
                <li className="list-none">
                  <Link
                    href={isSeller ? "/seller/orders" : "/buyer/orders"}
                    className="hover:text-lumo-accent transition block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </li>
                {isSeller && (
                  <li className="list-none">
                    <Link
                      href="/seller/services/create"
                      className="text-lumo-primary font-medium hover:text-lumo-accent transition block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create Service
                    </Link>
                  </li>
                )}
                <li className="list-none">
                  <button
                    onClick={() => {
                      handleModeSwitch();
                      setMobileMenuOpen(false);
                    }}
                    className="text-white hover:text-lumo-accent transition font-medium block py-2"
                  >
                    {isSeller ? "Switch to Buyer" : "Switch to Seller"}
                  </button>
                </li>
              </SignedIn>
            </ul>
            <div className="mt-6">
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