export const HOST = process.env.NEXT_PUBLIC_SERVER_URL;
export const API_URL = `${HOST}/api`;
export const IMAGES_URL = `${HOST}/uploads`;

export const AUTH_ROUTES = `${API_URL}/users`;
export const SERVICE_ROUTES = `${API_URL}/services`;
export const ORDERS_ROUTES = `${API_URL}/orders`;
export const MESSAGES_ROUTES = `${API_URL}/messages`;
export const DASHBOARD_DATA_ROUTES = `${API_URL}/dashboard`;

export const SYNC_USER_ROUTE = `${AUTH_ROUTES}/sync-user`;
export const ADD_SERVICE_ROUTE = `${SERVICE_ROUTES}/add`;
export const GET_USER_SERVICES_ROUTE = `${SERVICE_ROUTES}/get-user-services`;
export const GET_SERVICE_DATA = `${SERVICE_ROUTES}/get-service-data`;
export const EDIT_SERVICE_DATA = `${SERVICE_ROUTES}/edit-service`;
export const SEARCH_SERVICES_ROUTE = `${SERVICE_ROUTES}/search-services`;
export const CHECK_USER_ORDERED_SERVICE_ROUTE = `${SERVICE_ROUTES}/check-service-order`;
export const ADD_REVIEW = `${SERVICE_ROUTES}/add-review`;

export const CREATE_ORDER = `${ORDERS_ROUTES}/create`;
export const CONFIRM_ORDER = `${ORDERS_ROUTES}/confirm`; // New constant
export const GET_BUYER_ORDERS_ROUTE = `${ORDERS_ROUTES}/get-buyer-orders`;
export const GET_SELLER_ORDERS_ROUTE = `${ORDERS_ROUTES}/get-seller-orders`;

export const GET_MESSAGES = `${MESSAGES_ROUTES}/get-messages`;
export const ADD_MESSAGE = `${MESSAGES_ROUTES}/add-message`;
export const GET_UNREAD_MESSAGES = `${MESSAGES_ROUTES}/unread-messages`;
export const MARK_AS_READ_ROUTE = `${MESSAGES_ROUTES}/mark-as-read`;

export const GET_SELLER_DASHBOARD_DATA = `${DASHBOARD_DATA_ROUTES}/seller`;