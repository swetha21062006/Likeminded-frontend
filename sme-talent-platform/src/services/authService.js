import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import { api } from "./api";

// ─── OAuth helpers ────────────────────────────────────────────────────────────
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signInWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);
  return result.user;
};

// ─── Token helpers ────────────────────────────────────────────────────────────
const saveSession = (token, user, remember = false) => {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("token", token);
  storage.setItem("user", JSON.stringify(user));
  // always keep in localStorage so api.js picks it up via Bearer header
  localStorage.setItem("token", token);
};

const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// ─── AuthService ──────────────────────────────────────────────────────────────
class AuthService {
  // Register new user
  async register(userData) {
    const response = await api.post("/auth/register", userData);
    if (response.token) {
      saveSession(response.token, response.user, true);
    }
    return response.user;
  }

  // Login with email + password
  async login(email, password, userType, remember = false) {
    const response = await api.post("/auth/login", {
      email,
      password,
      userType,
    });
    if (response.token) {
      saveSession(response.token, response.user, remember);
    }
    return response.user;
  }

  // Logout — clears token + Firebase session
  async logout() {
    try {
      await signOut(auth);
      await api.post("/auth/logout");
    } finally {
      clearSession();
    }
  }

  // Verify token with backend and return user
  async getCurrentUser() {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await api.get("/auth/me");
      return response.user;
    } catch {
      clearSession();
      return null;
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem("token") || !!sessionStorage.getItem("token");
  }

  getStoredUser() {
    return getStoredUser();
  }

  getUserType() {
    const user = getStoredUser();
    return user?.userType || null;
  }

  getFirebaseAuthStateListener(callback) {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL || "",
          loginProvider: firebaseUser.providerData[0]?.providerId || "email",
        });
      } else {
        callback(null);
      }
    });
  }

  saveProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
    return profile;
  }

  getProfile() {
    const profile = localStorage.getItem("profile");
    return profile ? JSON.parse(profile) : null;
  }

  updateProfile(updates) {
    const current = this.getProfile() || {};
    return this.saveProfile({ ...current, ...updates });
  }
}

export const authService = new AuthService();
