"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaBalanceScale, FaMoneyBillWave, FaChartLine, FaBullhorn, FaLaptopCode, FaTruck } from "react-icons/fa";

const popularServices = [
  {
    name: "Register Your Business",
    icon: <FaBalanceScale className="text-lumo-accent text-4xl" />,
    image: "/services/business-reg.jpg",
    description: "Company registration, BEE certification & compliance.",
    link: "/search?query=legal-compliance",
  },
  {
    name: "Get Funding Ready",
    icon: <FaMoneyBillWave className="text-lumo-accent text-4xl" />,
    image: "/services/investor.jpg",
    description: "Investor pitch decks, business valuation & funding proposals.",
    link: "/search?query=funding-investment",
  },
  {
    name: "Marketing & Branding",
    icon: <FaBullhorn className="text-lumo-accent text-4xl" />,
    image: "/services/seo.jpg",
    description: "SEO, social media, and brand identity design.",
    link: "/search?query=marketing-branding",
  },
  {
    name: "Business Strategy",
    icon: <FaChartLine className="text-lumo-accent text-4xl" />,
    image: "/services/market-research.jpg",
    description: "Market research, sales strategy & export assistance.",
    link: "/search?query=business-development",
  },
  {
    name: "Tech & Web Solutions",
    icon: <FaLaptopCode className="text-lumo-accent text-4xl" />,
    image: "/services/web-dev.jpg",
    description: "Website & e-commerce development, cybersecurity.",
    link: "/search?query=it-tech-services",
  },
  {
    name: "Logistics & Compliance",
    icon: <FaTruck className="text-lumo-accent text-4xl" />,
    image: "/services/warehouse.jpg",
    description: "Warehousing, import/export, and licensing.",
    link: "/search?query=logistics-operations",
  },
];

const PopularServices = () => {
  const router = useRouter();

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-lumo-dark text-center">
          Most Requested Business Services
        </h2>
        <p className="text-center text-lg text-lumo-gray-600 mt-2">
          Everything you need to <strong>launch, fund & scale</strong> your business.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {popularServices.map(({ name, icon, image, description, link }) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative cursor-pointer rounded-xl shadow-lg overflow-hidden group"
              onClick={() => router.push(link)}
            >
              {/* Background Image */}
              <Image
                src={image}
                alt={name}
                width={400}
                height={300}
                className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Service Name & Icon */}
              <div className="absolute bottom-20 left-5 flex items-center gap-2 text-white text-lg font-semibold bg-black/50 px-3 py-1.5 rounded-md">
                {icon} {name}
              </div>
              <p className="text-sm text-center text-lumo-gray-600 mt-3">{description}</p>
            </motion.div>

            
            
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-lg text-lumo-gray-600">
            Need more tailored services? Find everything your business needs.
          </p>
          <button
            className="mt-4 px-6 py-3 text-white bg-lumo-primary font-semibold rounded-lg hover:bg-lumo-dark transition-all duration-500"
            onClick={() => router.push("/search")}
          >
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
