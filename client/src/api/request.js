import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { logout } from '@/stores/auth';

const { FORBIDDEN } = StatusCodes;

const config = {
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
};

const request = axios.create(config);

const isAuthError = err => [FORBIDDEN].includes(err.response.status);


request.interceptors.response.use(
  res => res,
  err => {
    //if (isAuthError(err)) logout();
    if (isAuthError(err)) {
      // Handle a FORBIDDEN error without throwing it
      // You can add additional logic here if needed
      console.log("User is not logged in:", err);

      // Return a resolved promise to prevent the error from propagating
      return Promise.resolve(err);
    }
  },
);

export default request;
