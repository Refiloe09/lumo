/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Pricing from "../../components/Services/Pricing";
import Details from "../../components/Services/Details";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  CHECK_USER_ORDERED_SERVICE_ROUTE,
  GET_SERVICE_DATA,
} from "../../../utils/constants";
import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";
import { useAuth } from "@clerk/nextjs";

interface Service {
  id: string;
  images: string[];
  createdBy: {
    clerkUserId: string;
    email: string;
    profileImage?: string | null;
    username?: string;
    phone?: string | null;
  };
  title: string;
  reviews: { rating: number; id?: string; reviewText?: string; reviewer?: any }[] | number;
  price: number;
  category: string;
  deliveryTime: number;
  shortDesc: string;
  description: string;
  totalReviews?: number;
}

interface ClerkUser {
  username?: string;
  profile_image_url?: string | null;
}

const Service: React.FC = () => {
  const { serviceId } = useParams();
  const [{ serviceData, userInfo }, dispatch] = useStateProvider();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchServiceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const {
          data: { service },
        } = await axios.get(`${GET_SERVICE_DATA}/${serviceId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Initial service data:", service);

        let enrichedService: Service = { ...service } as Service;
        if (service.createdBy?.clerkUserId) {
          try {
            const clerkUserResponse = await axios.get<ClerkUser>(
              `/api/clerk/user/${service.createdBy.clerkUserId}`,
              {
                headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_SECRET_KEY}` },
              }
            );
            const clerkUser = clerkUserResponse.data;
            enrichedService = {
              ...service,
              createdBy: {
                ...service.createdBy,
                username: clerkUser.username || service.createdBy.email.split("@")[0] || "Anonymous",
                profileImage: clerkUser.profile_image_url || null,
              },
            };
          } catch (clerkErr) {
            console.error("Clerk API error:", clerkErr);
            enrichedService = {
              ...service,
              createdBy: {
                ...service.createdBy,
                username: service.createdBy.email.split("@")[0] || "Anonymous",
                profileImage: null,
              },
            };
          }
        } else {
          enrichedService = {
            ...service,
            createdBy: {
              ...service.createdBy,
              username: service.createdBy.email.split("@")[0] || "Anonymous",
              profileImage: null,
            },
          };
        }

        if (typeof enrichedService.reviews === "number") {
          enrichedService.reviews = [{ rating: enrichedService.reviews }];
        }

        if (isMounted) {
          dispatch({ type: reducerCases.SET_SERVICE_DATA, serviceData: enrichedService });
          console.log("Dispatched serviceData:", enrichedService);
        }
      } catch (err) {
        console.error("Error fetching service data:", err);
        if (isMounted) setError("Failed to load service data. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (serviceId) fetchServiceData();

    return () => {
      isMounted = false;
    };
  }, [serviceId, dispatch, getToken]);

  useEffect(() => {
    const checkServiceOrdered = async () => {
      try {
        const {
          data: { hasUserOrderedService },
        } = await axios.get(`${CHECK_USER_ORDERED_SERVICE_ROUTE}/${serviceId}`, {
          withCredentials: true,
        });
        dispatch({
          type: reducerCases.HAS_USER_ORDERED_SERVICE,
          hasOrdered: hasUserOrderedService,
        });
      } catch (err) {
        console.error("Error checking service order:", err);
      }
    };
    if (userInfo) {
      checkServiceOrdered();
    }
  }, [dispatch, serviceId, userInfo]);

  console.log("Current serviceData in render:", serviceData);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-medium text-gray-600 animate-pulse">Loading service...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-medium text-red-500">{error}</div>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-medium text-red-500">Service not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Service Details */}
          <div className="lg:col-span-3">
            <Details serviceData={serviceData} key={`details-${serviceData.id}`} />
          </div>

          {/* Right Side - Pricing Component */}
          <div className="lg:col-span-1">
            <Pricing key={`pricing-${serviceData.id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;