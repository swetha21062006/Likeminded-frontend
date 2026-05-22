const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      credentials: "include", // ✅ sends HttpOnly cookie on every request
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Also send Bearer token from localStorage as fallback
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Something went wrong");
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error.message);
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { method: "GET", ...options });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: "DELETE", ...options });
  }

  upload(endpoint, formData, options = {}) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      credentials: "include", // ✅
      body: formData,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...options,
    }).then((res) => {
      if (!res.ok) throw new Error("Upload failed");
      return res.json();
    });
  }
}

export const api = new ApiService();
