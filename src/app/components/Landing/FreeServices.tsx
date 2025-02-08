"use client";

import React from "react";

const freeServices = [
  {
    name: "CIPC Registration",
    description: "Register your company with CIPC.",
    link: "https://www.cipc.co.za/",
  },
  {
    name: "SARS eFiling Support",
    description: "Manage tax, VAT, and PAYE online.",
    link: "https://secure.sarsefiling.co.za/landing",
  },
  {
    name: "UIF Registration",
    description: "Register for Unemployment Insurance Fund (UIF).",
    link: "https://ufiling.labour.gov.za/uif/",
  },
  {
    name: "BEE Compliance Tools",
    description: "Check your B-BBEE compliance.",
    links: [
      { label: "BEE Commission", url: "https://www.bbbeecommission.co.za/" },
      { label: "BEE Portal", url: "https://portal.bbbeecommission.co.za/" },
    ],
  },
  {
    name: "DTIC Grants & Incentives",
    description: "Explore funding & business incentives.",
    link: "https://www.thedtic.gov.za/financial-and-non-financial-support/incentives/",
  },
  {
    name: "NYDA Youth Programs",
    description: "Funding & mentorship for young entrepreneurs.",
    link: "https://www.nyda.gov.za/",
  },
];

const FreeServices = () => {
  return (
    <section className="w-full py-12 bg-lumo-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-lumo-dark text-center">
          Free Government Services
        </h2>
        <p className="text-center text-sm text-lumo-gray-600 mt-2 mb-6">
          Access essential resources from the South African government.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {freeServices.map(({ name, description, link, links }) => (
            <div key={name} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-lumo-dark mb-2">{name}</h3>
              <p className="text-sm text-lumo-gray-600">{description}</p>

              {/* Links */}
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-lumo-primary text-sm font-medium block mt-2 hover:underline">
                  Visit Website →
                </a>
              ) : (
                <div className="mt-2 flex flex-col space-y-1">
                  {links?.map(({ label, url }) => (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="text-lumo-primary text-sm font-medium hover:underline">
                      {label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeServices;
