"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaHandshake, FaRocket } from "react-icons/fa";
import { useRouter } from "next/navigation";

const HowItWorks = () => {
  const router = useRouter();

  return (
    <section className="w-full py-20 bg-lumo-light mt-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <h1 className="text-4xl font-bold text-lumo-dark">How It Works</h1>
        <p className="text-lg text-lumo-gray-600 mt-4">
          Empowering South African entrepreneurs to grow their businesses with trusted, local service providers. From legal compliance to marketing, we’ve got you covered.
        </p>

        {/* Steps Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition-shadow"
          >
            <FaSearch className="text-lumo-primary text-5xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-lumo-dark mb-4">Step 1: Find What You Need</h3>
            <p className="text-lumo-gray-600">
              Discover a wide range of services tailored for South African businesses. Whether you need help with <strong>BEE certification</strong>, <strong>tax filing</strong>, or <strong>digital marketing</strong>, our platform makes it easy to find the right expertise.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition-shadow"
          >
            <FaHandshake className="text-lumo-primary text-5xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-lumo-dark mb-4">Step 2: Connect with Experts</h3>
            <p className="text-lumo-gray-600">
              Compare verified service providers, read reviews, and get matched with the best fit for your needs. Our platform ensures you work with <strong>trusted professionals</strong> who understand the South African business landscape.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition-shadow"
          >
            <FaRocket className="text-lumo-primary text-5xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-lumo-dark mb-4">Step 3: Grow Your Business</h3>
            <p className="text-lumo-gray-600">
              From secure payments to project tracking, we make it simple to get things done. Focus on growing your business while we handle the rest. <strong>Your success is our mission.</strong>
            </p>
          </motion.div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <p className="text-xl text-lumo-gray-700 mb-6">
            Ready to take your business to the next level? Find the right service today and start growing with confidence.
          </p>
          <button
            className="mt-4 px-8 py-3 text-white bg-lumo-primary font-semibold rounded-lg hover:bg-lumo-dark transition-all duration-300"
            onClick={() => router.push("/search")}
          >
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;