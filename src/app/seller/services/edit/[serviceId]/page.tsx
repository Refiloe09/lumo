"use client";

import ImageUpload from "../../../../components/ImageUpload";
import categories, { Category } from "@/utils/categories";
import {
  EDIT_SERVICE_DATA,
  GET_SERVICE_DATA,
  IMAGES_URL,
} from "../../../../../utils/constants";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useAuth } from "@clerk/nextjs";

// Define interfaces for data types
interface Service {
  id: number;
  title: string;
  category: string;
  description: string;
  deliveryTime: number;
  revisions: number;
  features: string[];
  price: number;
  shortDesc: string;
  images?: string[];
}

interface FormData {
  id: number;
  title: string;
  category: string;
  description: string;
  time: number;
  revisions: number;
  feature: string;
  price: number;
  shortDesc: string;
}

const EditService = () => {
  const router = useRouter();
  const { serviceId } = useParams(); // Dynamic route param: [serviceId]
  const { getToken } = useAuth();

  // State management
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    title: "",
    category: "",
    description: "",
    time: 0,
    revisions: 0,
    feature: "",
    price: 0,
    shortDesc: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Updated CSS Classes
  const inputClassName =
    "w-full p-4 text-sm text-gray-800 border border-gray-200 rounded-lg bg-gray-50 shadow-sm focus:ring-lumo-accent focus:border-lumo-accent focus:outline-none disabled:bg-gray-200 disabled:text-gray-500";
  const labelClassName =
    "block mb-2 text-lg text-lumo-dark font-bold";
  const formSectionClassName =
    "bg-white rounded-lg p-6 shadow-md border border-gray-100";
  const featureItemClassName =
    "flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors";

  // Handlers
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "time" || name === "revisions" || name === "price"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const addFeature = () => {
    if (formData.feature.trim()) {
      setFeatures([...features, formData.feature.trim()]);
      setFormData({ ...formData, feature: "" });
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Fetch service data
  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceId || typeof serviceId !== "string") {
        setError("Invalid service ID");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const token = await getToken();
        const response = await axios.get(`${GET_SERVICE_DATA}/${serviceId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        
        const service: Service = response.data.service;
        setFormData({
          id: service.id,
          title: service.title || "",
          category: service.category || "",
          description: service.description || "",
          time: service.deliveryTime || 0,
          revisions: service.revisions || 0,
          feature: "",
          price: service.price || 0,
          shortDesc: service.shortDesc || "",
        });
        setFeatures(service.features || []);

        // Fetch existing images
        if (service.images?.length) {
          const fetchedFiles = await Promise.all(
            service.images.map(async (image: string) => {
              const url = `${IMAGES_URL}/${image}`;
              const response = await fetch(url);
              const blob = await response.blob();
              return new File([blob], image, { type: blob.type });
            })
          );
          setFiles(fetchedFiles);
        }
      } catch (err) {
        const error = err as AxiosError;
        console.error("Error fetching service:", error);
        setError(
          error.response?.status === 404
            ? "Service not found"
            : "Failed to load service data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceId, getToken]);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { category, description, price, revisions, time, title, shortDesc } = formData;
      const token = await getToken();

      if (!title || !category || !description || !price || !time || !revisions || !shortDesc) {
        throw new Error("Please fill in all required fields");
      }
      if (features.length === 0) throw new Error("Please add at least one feature");
      if (files.length === 0) throw new Error("Please upload at least one image");

      const formDataToSend = new FormData();
      files.forEach((file) => formDataToSend.append("images", file));

      const serviceData = {
        title,
        description,
        category,
        features,
        price,
        revisions,
        time,
        shortDesc,
      };

      const response = await axios.put(
        `${EDIT_SERVICE_DATA}/${formData.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
          params: serviceData,
        }
      );

      if (response.status === 201 || response.status === 200) {
        router.push("/seller/services");
      }
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error updating service:", error);
      setError(
        error.response?.status === 404
          ? "Service not found"
          : error.message || "Failed to update service. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-32 py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lumo-teal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service data...</p>
        </div>
      </div>
    );
  }

  console.log("Rendering EditService, formData:", formData);
  console.log("Features:", features);
  console.log("Files:", files);

  return (
    <section className="min-h-[80vh] px-4 sm:px-6 lg:px-32 py-10 bg-lumo-light z-10" aria-label="Edit Service">
      <h1 className="text-4xl font-bold text-lumo-dark  mb-8">
        Edit Service
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg shadow-md" role="alert">
          {error}
          <button
            className="ml-2 underline focus:outline-none text-lumo-teal hover:text-lumo-dark"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      <div className={formSectionClassName}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className={labelClassName}>
                Service Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                id="title"
                className={inputClassName}
                placeholder="e.g. I will do something I'm really good at"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="categories" className={labelClassName}>
                Category
              </label>
              <select
                id="categories"
                className={inputClassName}
                name="category"
                onChange={handleChange}
                value={formData.category}
                required
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                {categories.map((category: Category) => (
                  <option key={category.label} value={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className={labelClassName}>
              Description
            </label>
            <textarea
              id="description"
              className={`${inputClassName} h-32`}
              placeholder="Describe your service in detail"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="delivery" className={labelClassName}>
                Delivery Time (days)
              </label>
              <input
                type="number"
                className={inputClassName}
                id="delivery"
                name="time"
                value={formData.time}
                onChange={handleChange}
                min="1"
                required
                disabled={isSubmitting}
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
                name="revisions"
                value={formData.revisions}
                onChange={handleChange}
                min="0"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="features" className={labelClassName}>
                Features
              </label>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  id="features"
                  className={inputClassName}
                  placeholder="Add a feature"
                  name="feature"
                  value={formData.feature}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-lumo-teal text-white rounded-lg hover:bg-lumo-dark focus:outline-none focus:ring-2 focus:ring-lumo-teal disabled:bg-gray-400"
                  onClick={addFeature}
                  disabled={isSubmitting}
                >
                  Add
                </button>
              </div>
              {features.length > 0 && (
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li
                      key={`${feature}-${index}`}
                      className={featureItemClassName}
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => removeFeature(index)}
                        disabled={isSubmitting}
                        aria-label={`Remove ${feature}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label htmlFor="image" className={labelClassName}>
                Service Images
              </label>
              <ImageUpload files={files} setFile={setFiles} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="shortDesc" className={labelClassName}>
                Short Description
              </label>
              <input
                type="text"
                className={inputClassName}
                id="shortDesc"
                placeholder="Brief overview of your service"
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="price" className={labelClassName}>
                Price (R)
              </label>
              <input
                type="number"
                className={inputClassName}
                id="price"
                placeholder="Service price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                step="0.01"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-lumo-secondary text-white rounded-lg hover:bg-lumo-dark focus:outline-none focus:ring-2 focus:ring-lumo-teal disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => router.push("/seller/services")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditService;