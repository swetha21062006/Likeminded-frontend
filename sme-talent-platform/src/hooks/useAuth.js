import { useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(() => authService.getStoredUser()); // instant hydrate
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verify stored token against backend on mount
  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!cancelled) setUser(currentUser);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    verify();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password, userType, remember) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login(
        email,
        password,
        userType,
        remember,
      );
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    clearError,
  };
};
