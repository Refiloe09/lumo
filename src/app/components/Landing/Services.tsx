"use client";

import React from "react";
import { useRouter } from "next/navigation";
import categories from "@/utils/categories";
import { motion } from "framer-motion";

const Services = () => {
  const router = useRouter();

  return (
    <section className="w-full py-16 bg-lumo-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-lumo-dark text-center">
          Find the right service for your business
        </h2>
        <p className="text-center text-lg text-lumo-gray-600 mt-2">
          From legal support to tech solutions, we have you covered.
        </p>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {categories.map(({ label, icon, subcategories }, index) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`relative cursor-pointer rounded-2xl p-6 text-white shadow-md 
                ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-lumo-primary to-lumo-accent"
                    : "bg-gradient-to-br from-lumo-secondary to-lumo-dark"
                }
                hover:shadow-lg transition-shadow`}
              onClick={() => router.push(`/search?category=${label}`)}
            >
              {/* Category Title & Icon */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{icon}</span>
                <h3 className="text-xl font-semibold">{label}</h3>
              </div>

              {/* Subcategories (Clickable) */}
              <ul className="space-y-2 text-sm text-white/80">
                {subcategories.slice(0, 3).map((sub, index) => (
                  <li
                    key={index}
                    className="hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/search?subcategory=${sub}`);
                    }}
                  >
                    {sub}
                  </li>
                ))}
              </ul>

              {/* Explore More Link */}
              <span className="mt-4 inline-block text-sm font-medium text-white/90 hover:text-white transition-colors">
                Explore Services →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
