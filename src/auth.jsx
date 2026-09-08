import { createContext, useContext, useMemo, useState } from "react";
import { apiUrl } from "./api";

const AuthContext = createContext(null);
const TOKEN_KEY = "cmu-cyber-token";
const USER_KEY = "cmu-cyber-user";

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(readStoredUser);

  const value = useMemo(
    () => ({
      token,
      user,
      isAdmin: user?.role === "admin",
      async login(email, password) {
        const response = await fetch(apiUrl("/api/auth/login"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Unable to sign in.");
        }
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
      },
      logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken("");
        setUser(null);
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
