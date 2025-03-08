"use client";

import React from "react";
import { useRouter } from "next/navigation";
import categories from "@/utils/categories";
import { motion } from "framer-motion";
import { FaAngleRight } from "react-icons/fa"; // For the arrow in "Explore Services"

const Services = () => {
  const router = useRouter();

  return (
    <section className="w-full py-16 bg-lumo-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-4xl font-bold text-lumo-dark text-center mb-4">
          Find the right service for your business
        </h2>
        <p className="text-center text-lg text-lumo-gray-600 max-w-2xl mx-auto mb-8">
          From legal support to tech solutions, we have you covered.
        </p>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {categories.map(({ label, icon, subcategories }, index) => {
            const isYellowGradient = [0, 2].includes(index % 4); // Alternate yellow and teal based on mockup
            return (
              <motion.div
                key={label}
                whileHover={{ scale: 1.03, y: -5 }} // Lift effect on hover
                transition={{ duration: 0.3 }}
                className={`relative cursor-pointer rounded-2xl p-6 text-white shadow-md hover:shadow-xl transition-all duration-300
                  ${isYellowGradient
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                    : "bg-gradient-to-br from-teal-700 to-teal-900"
                  }`}
                onClick={() => router.push(`/search?query=${label}`)}
              >
                {/* Category Title & Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl p-2 bg-white/10 rounded-full">{icon}</span>
                  <h3 className="text-2xl font-semibold">{label}</h3>
                </div>

                {/* Subcategories (Clickable) */}
                <ul className="space-y-2 text-sm text-white/70">
                  {subcategories.slice(0, 3).map((sub, idx) => (
                    <li
                      key={idx}
                      className="hover:text-white transition-colors cursor-pointer line-clamp-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/search?query=${sub}`);
                      }}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>

                {/* Explore More Link */}
                <div className="mt-6 border-t border-white/20 pt-4">
                  <span
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors group"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/search?query=${label}`);
                    }}
                  >
                    Explore Services
                    <FaAngleRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                {/* View All Option */}
                {subcategories.length > 3 && (
                  <span
                    className="mt-2 inline-block text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/search?category=${label}`);
                    }}
                  >
                    View All
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;