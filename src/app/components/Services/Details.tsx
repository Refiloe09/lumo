import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddReview from "../../components/Services/AddReview";
import Reviews from "../../components/Services/Reviews";
import { FaStar } from "react-icons/fa";
import { useStateProvider } from "../../context/StateContext";
import { HOST } from "@/utils/constants";

function Details() {
  const [{ serviceData, hasOrdered }] = useStateProvider();
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (serviceData) {
      setCurrentImage(serviceData.images[0]);
    }
  }, [serviceData]);

  const [averageRatings, setAverageRatings] = useState("0");
  useEffect(() => {
    if (serviceData && serviceData.reviews.length) {
      let avgRating = 0;
      serviceData.reviews.forEach((review: { rating: number }) => (avgRating += review.rating));
      setAverageRatings((avgRating / serviceData.reviews.length).toFixed(1));
    }
  }, [serviceData]);

  return (
    <>
      {serviceData && currentImage !== "" && (
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-[#404145] mb-1">
            {serviceData.title}
          </h2>
          <div className="flex items-center gap-2">
            <div>
              {serviceData.createdBy.profileImage ? (
                <Image
                  src={HOST + "/" + serviceData.createdBy.profileImage}
                  alt="profile"
                  height={30}
                  width={30}
                  className="rounded-full"
                />
              ) : (
                <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                  <span className="text-xl text-white">
                    {serviceData.createdBy.email[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <h4 className="text-[#27272a] font-bold">
                {serviceData.createdBy.fullName}
              </h4>
              <h6 className="text-[#74767e]">@{serviceData.createdBy.username}</h6>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${
                      Math.ceil(Number(averageRatings)) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-yellow-500">{averageRatings}</span>
              <span className="text-[#27272a]">({serviceData.reviews.length})</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="max-h-[1000px] max-w-[1000px] overflow-hidden">
              <Image
                src={HOST + "/uploads/" + currentImage}
                alt="service"
                height={1000}
                width={1000}
                className="hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              {serviceData.images.length > 1 &&
                serviceData.images.map((image: string) => (
                  <Image
                    src={HOST + "/uploads/" + image}
                    alt="service"
                    height={100}
                    width={100}
                    key={image}
                    onClick={() => setCurrentImage(image)}
                    className={`${
                      currentImage === image ? "" : "blur-sm"
                    } cursor-pointer transition-all duration-500`}
                  />
                ))}
            </div>
          </div>
          <div>
            <h3 className="text-3xl my-5 font-medium text-[#404145]">
              About this service
            </h3>
            <div>
              <p>{serviceData.description}</p>
            </div>
          </div>
          {/* About the seller */}
          <div className="">
            <h3 className="text-3xl my-5 font-medium text-[#404145]">
              About the Seller
            </h3>
            <div className="flex gap-4">
              <div>
                {serviceData.createdBy.profileImage ? (
                  <Image
                    src={HOST + "/" + serviceData.createdBy.profileImage}
                    alt="profile"
                    height={120}
                    width={120}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className="text-xl text-white">
                      {serviceData.createdBy.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex  gap-2 items-center">
                  <h4 className="font-medium text-lg">
                    {serviceData.createdBy.fullName}
                  </h4>
                  <span className="text-[#74767e]">
                    @{serviceData.createdBy.username}
                  </span>
                </div>
                <div>
                  <p>{serviceData.createdBy.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer ${
                          Math.ceil(serviceData.averageRating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-yellow-500">
                    {serviceData.averageRating}
                  </span>
                  <span className="text-[#74767e]">
                    ({serviceData.totalReviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Reviews />
          {hasOrdered && <AddReview />}
        </div>
      )}
    </>
  );
}

export default Details;