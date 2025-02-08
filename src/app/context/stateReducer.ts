/* eslint-disable @typescript-eslint/no-explicit-any */
import { reducerCases } from "./constants";

export const initialState = {
  isSeller: false, // Buyer/Seller Mode Toggle
  serviceData: undefined, // Store Current service Data
  hasOrdered: false, // Check if user ordered a service
  reloadReviews: false, // Trigger review refresh
};

const reducer = (
  state: { isSeller: boolean; serviceData?: { reviews?: any[] } },
  action: {
    type: string;
    serviceData?: any;
    hasOrdered?: boolean;
    newReview?: any;
  }
) => {
  switch (action.type) {
    case reducerCases.SWITCH_MODE:
      return {
        ...state,
        isSeller: !state.isSeller,
      };
    case reducerCases.SET_SERVICE_DATA:
      return {
        ...state,
        serviceData: action.serviceData,
      };
    case reducerCases.HAS_USER_ORDERED_SERVICE:
      return {
        ...state,
        hasOrdered: action.hasOrdered,
      };
    case reducerCases.ADD_REVIEW:
      return {
        ...state,
        serviceData: {
          ...state.serviceData,
          reviews: [...(state.serviceData?.reviews || []), action.newReview],
        },
      };
    default:
      return state;
  }
};

export default reducer;
