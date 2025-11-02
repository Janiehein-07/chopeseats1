import { getToken } from "../util/security";

function useFetch() {
  // Safely parse JSON responses. If the body is empty, return an empty object.
  const parseJsonSafe = async (res) => {
    const text = await res.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch (err) {
      console.log("Failed to parse JSON response:", err);
      return {};
    }
  };

  const sendRequest = async (url, method, payload) => {
    const options = { method };
    if (payload) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(payload);
    }

    const token = getToken();
    if (token) {
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const res = await fetch(url, options);
      const data = await parseJsonSafe(res);
      if (!res.ok) {
        throw new Error(
          data && data.errorMsg ? data.errorMsg : res.statusText || "Something went wrong"
        );
      }

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const getLoginDetails = async (email) => {
    try {
      const searchParams = new URLSearchParams({ email: email });
      const url = `${import.meta.env.VITE_API_URL}/user/login?${searchParams}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await parseJsonSafe(res);
      if (!res.ok) {
        throw new Error(
          data && data.errorMsg ? data.errorMsg : res.statusText || "Something went wrong"
        );
      }
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {
    sendRequest,
    getLoginDetails,
  };
}

export default useFetch;
