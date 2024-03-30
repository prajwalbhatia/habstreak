import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios from './axios';

export const axiosBaseQuery: BaseQueryFn<
  { url: string; method: string; body?: object },
  unknown,
  object
> = async ({ url, method, body }) => {
  try {
    let result;
    if (method === "POST") {
      result = await axios.post(url, body);
    } else if (method === "GET") {
      result = await axios.get(url);
    } else if (method === "PUT") {
      result = await axios.put(url, body);
    }
    else if (method === "PATCH") {
      result = await axios.patch(url, body);
    }  
    else if (method === "DELETE") {
      result = await axios.delete(url);
    }

    return {
      data: result?.data || null,
    };
  } catch (error: any) {
    return {
      error: {
        status: error.response?.status || 500,
        data: error.response?.data || "Error",
      },
    };
  }
};
