/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { useStateProvider } from "../../context/StateContext";
import { useRouter } from "next/navigation";




 function Pricing() {
  const [{ serviceData, userInfo }] = useStateProvider();
  const router = useRouter();

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!serviceData) return;

    if (serviceData.createdBy.email) {
      window.location.href = `mailto:${serviceData.createdBy.email}`;
    } else if (serviceData.createdBy.phone) {
      window.location.href = `tel:${serviceData.createdBy.phone}`;
    } else {
      alert("No contact information available.");
    }
  };

  if (!serviceData) {
    return null;
  }

  const isOwner = serviceData.createdBy.clerkUserId === userInfo?.id;

  return (
    <div className="w-full max-w-md mx-auto md:max-w-sm lg:max-w-md sticky top-16 shadow-lg bg-white rounded-xl border border-gray-100">
      {/* Pricing Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <h4 className="text-sm md:text-md text-gray-600 font-normal flex-1">
            {serviceData.shortDesc || "No description available"}
          </h4>
          <h6 className="text-lg md:text-xl font-semibold text-gray-900">
            R {serviceData.price?.toLocaleString() || "0"}
          </h6>
        </div>
      </div>

      {/* Pricing Details */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <FiClock className="text-lg text-gray-500" />
            <span>
              {serviceData.deliveryTime || 0} {serviceData.deliveryTime === 1 ? "Day" : "Days"} Delivery
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiRefreshCcw className="text-lg text-gray-500" />
            <span>
              {serviceData.revisions || 0} {serviceData.revisions === 1 ? "Revision" : "Revisions"}
            </span>
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-3">
          {serviceData.features?.length ? (
            serviceData.features.map((feature: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
              <li key={index} className="flex items-start gap-3">
                <BsCheckLg className="text-green-500 text-lg flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm italic">No features available</li>
          )}
        </ul>

        {/* Action Button */}
        <button
          className="w-full bg-lumo-secondary hover:bg-lumo-primary text-white py-3 px-4 rounded-lg font-semibold text-base md:text-lg transition-colors duration-200 flex items-center justify-center relative group"
          onClick={() =>
            router.push(
              isOwner
                ? `/seller/services/${serviceData.id}`
                : `/checkout?serviceId=${serviceData.id}`
            )
          }
        >
          <span>{isOwner ? "Edit" : "Continue"}</span>
          <BiRightArrowAlt className="text-xl md:text-2xl absolute right-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Contact Button (non-owners only) */}
      {!isOwner && (
        <div className="p-6 pt-0">
          <button
            onClick={handleContactClick}
            className="w-full py-2 px-4 border border-gray-400 text-gray-700 hover:bg-gray-600 hover:text-white hover:border-gray-600 rounded-lg font-medium text-base transition-all duration-300"
          >
            Contact Me
          </button>
        </div>
      )}
    </div>
  );
};

export default Pricing;