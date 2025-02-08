"use client";

import { HOST, IMAGES_URL } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";

interface Service {
  id: string;
  images: string[];
  createdBy: {
    profileImage?: string;
    email: string;
    username: string;
  };
  title: string;
  reviews: { rating: number }[];
  price: number;
}

function SearchGridItem({ service }: { service: Service }) {
  const router = useRouter();
  const calculateRatings = () => {
    const { reviews } = service;
    let rating = 0;
    if (!reviews?.length) {
      return 0;
    }
    reviews?.forEach((review) => {
      rating += review.rating;
    });
    return (rating / reviews.length).toFixed(1);
  };
  return (
    <div
      className="max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8"
      onClick={() => router.push(`/service/${service.id}`)}
    >
      <div className="relative w-64 h-40">
        <Image
          src={`${IMAGES_URL}/${service.images[0]}`}
          alt="service"
          fill
          className="rounded-xl"
        />
      </div>
      <div className="flex items-center gap-2">
        <div>
          {service.createdBy.profileImage ? (
            <Image
              src={HOST + "/" + service.createdBy.profileImage}
              alt="profile"
              height={30}
              width={30}
              className="rounded-full"
            />
          ) : (
            <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
              <span className="text-lg text-white">
                {service.createdBy.email[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <span className="text-md ">
          <strong className="font-medium">{service.createdBy.username}</strong>
        </span>
      </div>
      <div>
        <p className="line-clamp-2 text-[#404145]">{service.title}</p>
      </div>
      <div className="flex items-center gap-1 text-yellow-400">
        <FaStar />
        <span>
          <strong className="font-medium">{calculateRatings()}</strong>
        </span>
        <span className="text-[#74767e]">({service.reviews.length})</span>
      </div>
      <div>
        <strong className="font-medium">From ${service.price}</strong>
      </div>
    </div>
  );
}

export default SearchGridItem;