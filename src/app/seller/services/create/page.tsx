"use client";

import ImageUpload from "../../../components/ImageUpload";
import categories from "@/utils/categories";
import { ADD_SERVICE_ROUTE } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";

function CreateServices() {
  const router = useRouter();
  const { getToken } = useAuth();
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName = "mb-2 text-lg font-medium text-gray-900  ";
  const [files, setFile] = useState<File[]>([]);
  const [features, setfeatures] = useState<string[]>([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    subcategory: "",
    description: "",
    time: 0,
    revisions: 0,
    feature: "",
    price: 0,
    shortDesc: "",
  });
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);

  const removeFeature = (index: number) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setfeatures(clonedFeatures);
  };

  interface ChangeEvent {
    target: {
      name: string;
      value: string | number;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.label === value);
      setAvailableSubcategories(selectedCategory ? selectedCategory.subcategories : []);
      setData((prevData) => ({ ...prevData, subcategory: "" })); // Reset subcategory when category changes
    }
  };

  const addFeature = () => {
    if (data.feature) {
      setfeatures([...features, data.feature]);
      setData({ ...data, feature: "" });
    }
  };

  const addService = async () => {
    console.log("🟢 Button clicked: Starting service creation...");
    const { category, subcategory, description, price, revisions, time, title, shortDesc } = data;

    // 🔍 Log required fields before making request
    if (!category) console.error("❌ Category is missing");
    if (!subcategory) console.error("❌ Subcategory is missing");
    if (!description) console.error("❌ Description is missing");
    if (!title) console.error("❌ Title is missing");
    if (!features.length) console.error("❌ Features are missing");
    if (!files.length) console.error("❌ Images are missing");
    if (price <= 0) console.error("❌ Price must be greater than 0");
    if (!shortDesc.length) console.error("❌ Short description is missing");
    if (revisions <= 0) console.error("❌ Revisions must be greater than 0");
    if (time <= 0) console.error("❌ Delivery time must be greater than 0");

    // 🔥 Check if any required field is missing before making the request
    if (
      !category || !subcategory || !description || !title || !features.length || !files.length || price <= 0 ||
      !shortDesc.length || revisions <= 0 || time <= 0
    ) {
      console.error("❌ Cannot submit form: Missing required fields");
      return;
    }

    try {
      console.log("📸 Preparing FormData...");
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const serviceData = {
        title,
        description,
        category,
        subcategory,
        features,
        price,
        revisions,
        time,
        shortDesc,
      };

      console.log("🟠 Fetching Clerk Auth Token...");
      const token = await getToken();
      if (!token) {
        console.error("❌ Failed to retrieve Clerk auth token!");
        return;
      }

      console.log("🚀 Sending API request to:", ADD_SERVICE_ROUTE);
      console.log("📦 Payload:", serviceData);

      const response = await axios.post(ADD_SERVICE_ROUTE, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        params: serviceData,
      });

      console.log("✅ Service created successfully!", response.data);
      if (response.status === 201) {
        router.push("/seller/services");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Error in API request:", error.response?.data || error.message);
      } else {
        console.error("❌ Error in API request:", error);
      }
    }
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32 ">
      <h1 className="text-6xl text-gray-900 mb-5">Create a new Service</h1>
      <h3 className="text-3xl text-gray-900 mb-5">
        Enter the details to create the service
      </h3>
      <form action="" className="flex flex-col gap-5 mt-10">
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="title" className={labelClassName}>
              Service Title
            </label>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              type="text"
              id="title"
              className={inputClassName}
              placeholder="e.g. I will do something I'm really good at"
              required
            />
          </div>
          <div>
            <label htmlFor="categories" className={labelClassName}>
              Select a Category
            </label>
            <select
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              name="category"
              onChange={handleChange}
              defaultValue="Choose a Category"
            >
              <option value="">Choose a Category</option>
              {categories.map(({ label }) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {data.category && (
          <div>
            <label htmlFor="subcategories" className={labelClassName}>
              Select a Subcategory
            </label>
            <select
              id="subcategories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              name="subcategory"
              onChange={handleChange}
              value={data.subcategory}
            >
              <option value="">Choose a Subcategory</option>
              {availableSubcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="description" className={labelClassName}>
            Service Description
          </label>
          <textarea
            id="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a short description"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="delivery">Delivery Time</label>
            <input
              type="number"
              className={inputClassName}
              id="delivery"
              name="time"
              value={data.time}
              onChange={handleChange}
              placeholder="Minimum Delivery Time"
            />
          </div>
          <div>
            <label htmlFor="revision" className={labelClassName}>
              Revisions
            </label>
            <input
              type="number"
              id="revision"
              className={inputClassName}
              placeholder="Max Number of Revisions"
              name="revisions"
              value={data.revisions}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="features" className={labelClassName}>
              Features
            </label>
            <div className="flex gap-3 items-center mb-5">
              <input
                type="text"
                id="features"
                className={inputClassName}
                placeholder="Enter a Feature Name"
                name="feature"
                value={data.feature}
                onChange={handleChange}
              />
              <button
                type="button"
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  font-medium  text-lg px-10 py-3 rounded-md "
                onClick={addFeature}
              >
                Add
              </button>
            </div>
            <ul className="flex gap-2 flex-wrap">
              {features.map((feature, index) => {
                return (
                  <li
                    key={feature + index.toString()}
                    className="flex gap-2 items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
                  >
                    <span>{feature}</span>
                    <span
                      className="text-red-700"
                      onClick={() => removeFeature(index)}
                    >
                      X
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <label htmlFor="image" className={labelClassName}>
              Service Images
            </label>
            <div>
              <ImageUpload files={files} setFile={setFile} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="shortDesc" className={labelClassName}>
              Short Description
            </label>
            <input
              type="text"
              className={`${inputClassName} w-1/5`}
              id="shortDesc"
              placeholder="Enter a short description."
              name="shortDesc"
              value={data.shortDesc}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price" className={labelClassName}>
              service Price ( R )
            </label>
            <input
              type="number"
              className={`${inputClassName} w-1/5`}
              id="price"
              placeholder="Enter a price"
              name="price"
              value={data.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button
            className="border   text-lg font-semibold px-5 py-3   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
            type="button"
            onClick={addService}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateServices;