/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import Pricing from "../components/Services/Pricing";
import Details from "../components/Services/Details";
import { useRouter } from "next/router";
import axios from "axios";
import {
  CHECK_USER_ORDERED_SERVICE_ROUTE,
  GET_SERVICE_DATA,
} from "../../utils/constants";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";

function Service() {
  const router = useRouter();
  const { serviceId } = router.query;
  const [{ serviceData, userInfo }, dispatch] = useStateProvider();
  useEffect(() => {
    dispatch({ type: reducerCases.SET_SERVICE_DATA, serviceData: undefined });
  }, [dispatch]);
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const {
          data: { service },
        } = await axios.get(`${GET_SERVICE_DATA}/${serviceId}`);
        dispatch({ type: reducerCases.SET_SERVICE_DATA, serviceData: service });
      } catch (err) {
        console.log(err);
      }
    };
    if (serviceId) fetchServiceData();
  }, [serviceId, dispatch]);

  useEffect(() => {
    const checkServiceOrdered = async () => {
      const {
        data: { hasUserOrderedService },
      } = await axios.get(`${CHECK_USER_ORDERED_SERVICE_ROUTE}/${serviceId}`, {
        withCredentials: true,
      });
      dispatch({
        type: reducerCases.HAS_USER_ORDERED_SERVICE,
        hasOrdered: hasUserOrderedService,
      });
    };
    if (userInfo) {
      checkServiceOrdered();
    }
  }, [dispatch, serviceId, userInfo]);

  return (
    <div className="grid grid-cols-3 mx-32 gap-20">
      <Details />
      <Pricing />
    </div>
  );
}

export default Service;