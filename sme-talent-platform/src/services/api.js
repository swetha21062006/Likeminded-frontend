const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
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
    const config = {
      method: "POST",
      body: formData,
      headers: {},
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${this.baseURL}${endpoint}`, config).then((response) => {
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      return response.json();
    });
  }
}

export const api = new ApiService();
