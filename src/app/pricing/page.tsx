"use client";

import React from "react";
import { FaMoneyBillWave, FaCheckCircle, FaRegClock } from "react-icons/fa";

const Pricing = () => {
  return (
    <section className="w-full py-16 bg-lumo-light mt-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-5xl font-bold text-lumo-dark text-center">
          Transparent Pricing, No Hidden Fees
        </h1>
        <p className="text-center text-lg text-lumo-gray-600 mt-2">
          Affordable pricing for businesses and service providers in South
          Africa. Choose the plan that works best for you.
        </p>

        {/* Pricing Models */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pay-Per-Service Model */}
          <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-lumo-dark flex items-center gap-2">
              <FaMoneyBillWave className="text-lumo-primary" /> Pay-Per-Service
            </h2>
            <p className="mt-3 text-lumo-gray-600">
              Only pay when you hire a service provider. A small commission is
              charged on completed projects.
            </p>
            <ul className="mt-4 space-y-2 text-lumo-gray-700">
              <li>✅ No upfront costs</li>
              <li>✅ Commission-based pricing</li>
              <li>✅ Secure payments via Stripe & PayStack</li>
            </ul>
            <p className="mt-6 font-medium text-lumo-primary">
              Service Fee: 10% per transaction
            </p>
          </div>

          {/* Subscription Plan for Service Providers */}
          <div className="p-6 rounded-2xl bg-lumo-primary text-white shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaCheckCircle /> Subscription Plan
            </h2>
            <p className="mt-3">
              Service providers can opt for a subscription plan to boost
              visibility and reduce per-transaction fees.
            </p>
            <ul className="mt-4 space-y-2">
              <li>✅ Featured listing for more visibility</li>
              <li>✅ Lower service fees (5%)</li>
              <li>✅ Priority support</li>
            </ul>
            <p className="mt-6 font-medium">
              Starting from <span className="text-xl font-bold">R299/month</span>
            </p>
          </div>

          {/* Payment Processing */}
          <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-lumo-dark flex items-center gap-2">
              <FaRegClock className="text-lumo-accent" /> Secure Payments
            </h2>
            <p className="mt-3 text-lumo-gray-600">
              We process payments through trusted gateways like Stripe and
              PayStack to ensure fast, safe, and secure transactions.
            </p>
            <ul className="mt-4 space-y-2 text-lumo-gray-700">
              <li>✅ Payments in ZAR & international currencies</li>
              <li>✅ Instant payouts for service providers</li>
              <li>✅ Fraud protection and buyer security</li>
            </ul>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-lumo-dark">
            Refund & Cancellation Policy
          </h2>
          <p className="mt-3 text-lumo-gray-600">
            We aim to provide a fair and secure platform for all users. Refunds
            are available under specific conditions.
          </p>

          {/* Refund Cases */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-lumo-dark">
              Buyer Refund Eligibility:
            </h3>
            <ul className="mt-3 space-y-2 text-lumo-gray-700">
              <li>🔹 Full refund if service is not delivered as agreed.</li>
              <li>
                🔹 Partial refund if work is completed but does not meet
                requirements.
              </li>
              <li>🔹 No refund for completed and approved projects.</li>
            </ul>
          </div>

          {/* Service Provider Refund Cases */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-lumo-dark">
              Service Provider Payouts:
            </h3>
            <ul className="mt-3 space-y-2 text-lumo-gray-700">
              <li>
                🔹 Funds are held in escrow until buyer approval or 7-day
                auto-release.
              </li>
              <li>🔹 Disputes handled via arbitration.</li>
              <li>🔹 Stripe & PayStack payout delays may apply.</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-lumo-dark text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-lumo-dark">
                How are payments processed?
              </h3>
              <p className="text-lumo-gray-600">
                We use **Stripe** and **PayStack** for secure payments. Funds
                are held in escrow until service completion.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-lumo-dark">
                Can I cancel a service after payment?
              </h3>
              <p className="text-lumo-gray-600">
                Yes, but refunds are subject to the terms mentioned above.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold text-lumo-dark">
                Are there additional fees?
              </h3>
              <p className="text-lumo-gray-600">
                No hidden fees! Only the commission or subscription charge
                applies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
