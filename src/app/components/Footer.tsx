import Link from "next/link";
import React from "react";
import {
  FiGithub,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { FaHandshake, FaBriefcase, FaShieldAlt, FaChartLine } from "react-icons/fa";
import Image from "next/image";


const Footer = () => {
  const socialLinks = [
    { name: "Github", icon: <FiGithub />, link: "https://www.github.com" },
    { name: "Youtube", icon: <FiYoutube />, link: "https://www.youtube.com" },
    { name: "LinkedIn", icon: <FiLinkedin />, link: "https://www.linkedin.com" },
    { name: "Instagram", icon: <FiInstagram />, link: "https://instagram.com" },
    { name: "Twitter", icon: <FiTwitter />, link: "https://twitter.com" },
  ];

  const sections = [
    {
      title: "Business Support",
      icon: <FaBriefcase className="text-lumo-primary" />,
      links: [
        { name: "Legal & Compliance", link: "/search?category=legal" },
        { name: "Financial Services", link: "/search?category=finance" },
        { name: "Business Development", link: "/search?category=business" },
      ],
    },
    {
      title: "Growth & Marketing",
      icon: <FaChartLine className="text-lumo-primary" />,
      links: [
        { name: "Branding & Identity", link: "/search?category=branding" },
        { name: "Sales Strategy", link: "/search?category=sales" },
        { name: "Market Research", link: "/search?category=market-research" },
      ],
    },
    {
      title: "Licensing & Compliance",
      icon: <FaShieldAlt className="text-lumo-primary" />,
      links: [
        { name: "BEE Certification", link: "/search?category=bee" },
        { name: "SARS Registration", link: "/search?category=sars" },
        { name: "Permits & Licensing", link: "/search?category=permits" },
      ],
    },
    {
      title: "Funding & Investment",
      icon: <FaHandshake className="text-lumo-primary" />,
      links: [
        { name: "Investor Pitch Decks", link: "/search?category=pitch-decks" },
        { name: "Grant & Funding Support", link: "/search?category=grants" },
        { name: "Venture Capital Networking", link: "/search?category=vc" },
      ],
    },
  ];

  return (
    <footer className="bg-lumo-dark text-white py-12 px-6 md:px-24">
      {/* ✅ Grid-based Sections */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {section.icon} {section.title}
            </h3>
            <ul className="mt-2 space-y-2">
              {section.links.map(({ name, link }) => (
                <li key={name}>
                  <Link href={link} className="hover:text-lumo-accent">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ✅ Footer Bottom: Logo & Socials */}
      <div className="border-t border-lumo-gray-600 pt-6 flex flex-col md:flex-row justify-between items-center">
        <Image src="logo.svg" alt="Lumo" width={120} height={40} priority />
        <p className="text-sm text-lumo-gray-300 mt-4 md:mt-0">
          © {new Date().getFullYear()} Lumo. Ignite Your Growth.
        </p>
        <ul className="flex gap-5 mt-4 md:mt-0">
          {socialLinks.map(({ icon, link, name }) => (
            <li key={name} className="text-xl hover:text-lumo-primary transition">
              <Link href={link}>{icon}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
