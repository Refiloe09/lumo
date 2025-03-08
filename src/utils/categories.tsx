import { JSX } from "react";
import { 
    FaBalanceScale, FaMoneyBillWave, FaChartLine, FaBullhorn, FaLaptopCode, 
    FaUsers, FaIndustry, FaFileContract, FaHandshake, FaTruck
  } from "react-icons/fa";

  interface Category {
    label: string;
    icon: JSX.Element; // Using JSX.Element for React icons
    subcategories: string[];
  }
  
  const categories: Category[] = [
    {
      label: "Legal & Compliance",
      icon: <FaBalanceScale />,
      subcategories: [
        "Contract Drafting & Review",
        "BEE (Broad-Based Black Economic Empowerment) Certification",
        "Company Secretarial Services",
        "Labour Law Compliance Audits",
        "Intellectual Property Registration"
      ]
    },
    {
      label: "Financial Services",
      icon: <FaMoneyBillWave />,
      subcategories: [
        "Accounting & Bookkeeping",
        "Tax Filing & VAT Management",
        "Payroll Administration",
        "Business Valuation",
        "Grant & Funding Proposal Writing"
      ]
    },
    {
      label: "Business Development",
      icon: <FaChartLine />,
      subcategories: [
        "Business Plan Writing",
        "Market Research & Feasibility Studies",
        "Sales Strategy Development",
        "Export Assistance (ITAC, SARS Customs)",
        "Franchise Advisory"
      ]
    },
    {
      label: "Marketing & Branding",
      icon: <FaBullhorn />,
      subcategories: [
        "Digital Marketing (SEO, Social Media)",
        "Brand Identity Design (Logos, Packaging)",
        "Content Creation (Copywriting, Video Production)",
        "Influencer Marketing",
        "Traditional Marketing (Flyers, Radio Ads)"
      ]
    },
    {
      label: "IT & Tech Services",
      icon: <FaLaptopCode />,
      subcategories: [
        "Website Development & Hosting",
        "E-commerce Setup (e.g., Shopify, WooCommerce)",
        "Software Solutions (CRM, POS Systems)",
        "Cybersecurity & Data Protection",
        "App Development"
      ]
    },
    {
      label: "HR & Recruitment",
      icon: <FaUsers />,
      subcategories: [
        "Staff Recruitment & Background Checks",
        "Skills Development Training",
        "HR Policy Development",
        "Workplace Diversity & Inclusion Programs",
        "Performance Management Systems"
      ]
    },
    {
      label: "Industry-Specific Services",
      icon: <FaIndustry />,
      subcategories: [
        "Agriculture: Agri-BEE Plans, Farm Permits",
        "Construction: Tender Bid Support, NHBRC Registration",
        "Retail: Stock Management, Supplier Negotiation",
        "Tourism: Travel Compliance, Tour Operator Licensing",
        "Manufacturing: ISO Certification, Energy Solutions (e.g., Solar for Load Shedding)"
      ]
    },
    {
      label: "Licensing & Permits",
      icon: <FaFileContract />,
      subcategories: [
        "Liquor License Applications",
        "Health & Safety Certificates (e.g., SHEQ)",
        "Environmental Impact Assessments",
        "Municipal Trading Permits"
      ]
    },
    {
      label: "Funding & Investor Support",
      icon: <FaHandshake />,
      subcategories: [
        "Investor Pitch Deck Creation",
        "Crowdfunding Campaign Management",
        "Loan Application Assistance (Non-Government)",
        "Venture Capital Networking"
      ]
    },
    {
      label: "Logistics & Operations",
      icon: <FaTruck />,
      subcategories: [
        "Supply Chain Optimization",
        "Import/Export Compliance",
        "Warehouse Management",
        "Fleet Management"
      ]
    }
  ];
  
  export default categories;
  export type { Category };
  