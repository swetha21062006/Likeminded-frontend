import { api } from "./api";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";

class AuthService {
  async login(email, password, userType) {
    const response = await api.post("/auth/login", {
      email,
      password,
      userType,
    });

    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response.user;
  }

  async register(userData) {
    const response = await api.post("/auth/register", userData);

    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response.user;
  }

  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  async getCurrentUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    try {
      const user = await api.get("/auth/me");
      return user;
    } catch (error) {
      // Token is invalid, remove it
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  getUserType() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.type;
  }
}
// Google sign-in (frontend only)
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

// GitHub sign-in (frontend only)
export const signInWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);
  return result.user;
};

export const authService = new AuthService();
