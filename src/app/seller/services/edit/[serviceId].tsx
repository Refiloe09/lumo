import ImageUpload from "../../../components/ImageUpload";
import  categories from "@/utils/categories";
import { EDIT_SERVICE_DATA, GET_SERVICE_DATA } from "../../../../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { ChangeEvent } from "react";

function EditService() {

  const router = useRouter();
  const { serviceId } = router.query;
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900  dark:text-white";
  const [files, setFile] = useState<File[]>([]);
  const [features, setfeatures] = useState<string[]>([]);
  const [data, setData] = useState({
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
const removeFeature = (index: number): void => {
    const clonedFeatures: string[] = [...features];
    clonedFeatures.splice(index, 1);
    setfeatures(clonedFeatures);
};
const { getToken } = useAuth();

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
};

  const addFeature = () => {
    if (data.feature) {
      setfeatures([...features, data.feature]);
      setData({ ...data, feature: "" });
    }
  };

  useEffect(() => {
    const fetchserviceData = async () => {
      try {
        const {
          data: { service },
        } = await axios.get(`${GET_SERVICE_DATA}/${serviceId}`);

        setData({ ...service, time: service.revisions });
        setfeatures(service.features);

        interface Image {
            image: string;
        }

        const fetchImages = (images: Image[]): void => {
            images.forEach((image) => {
                const url = "http://localhost:8747/uploads/" + image.image;
                const fileName = image.image;
                fetch(url).then(async (response) => {
                    const contentType = response.headers.get("content-type");
                    const blob = await response.blob();
                    if (contentType) {
                        const file = new File([blob], fileName, { type: contentType });
                        setFile((prevFiles) => [...prevFiles, file]);
                    }
                });
            });
        };

        fetchImages(service.images);
      } catch (err) {
        console.log(err);
      }
    };
    if (serviceId) fetchserviceData();
  }, [serviceId, files]);

  const editservice = async () => {
    const { category, description, price, revisions, time, title, shortDesc } =
      data;

      
    const token = await getToken();

    if (
      category &&
      description &&
      title &&
      features.length &&
      files.length &&
      price > 0 &&
      shortDesc.length &&
      revisions > 0 &&
      time > 0
    ) {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
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
        `${EDIT_SERVICE_DATA}/${data.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          params: serviceData,
        }
      );
      if (response.status === 201) {
        router.push("/seller/services");
      }
    }
  };
  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h1 className="text-6xl text-gray-900 mb-5">Edit Service</h1>
      <h3 className="text-3xl text-gray-900 mb-5">
        Enter the details to edit the service
      </h3>
      <form action="" className="flex flex-col gap-5 mt-10">
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="title" className={labelClassName}>
              service Title
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
              value={data.category}
            >
              {categories.map(({ label }) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className={labelClassName}>
            service Description
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
              service Images
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
              service Price ( $ )
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
            onClick={editservice}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditService;