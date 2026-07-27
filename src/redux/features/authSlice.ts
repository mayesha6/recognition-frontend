import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  user: { email: string | null; role: string | null } | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  }

  const token = Cookies.get("accessToken") || null;

  const user = localStorage.getItem("user");

  return {
    token,
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!token,
  };
};
const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; user: any }>) => {
      const isProduction =
        process.env.NODE_ENV === "production" &&
        typeof window !== "undefined" &&
        !window.location.hostname.includes("localhost") &&
        !window.location.hostname.includes("127.0.0.1");

      const cookieOptions = {
        domain: isProduction ? ".greetely.com" : undefined,
        secure: isProduction,
        sameSite: isProduction ? ("None" as const) : ("Lax" as const),
        path: "/",
      };

      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      Cookies.set("accessToken", action.payload.token, cookieOptions);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      const isProduction =
        process.env.NODE_ENV === "production" &&
        typeof window !== "undefined" &&
        !window.location.hostname.includes("localhost") &&
        !window.location.hostname.includes("127.0.0.1");

      const cookieOptions = {
        domain: isProduction ? ".greetely.com" : undefined,
        secure: isProduction,
        sameSite: isProduction ? ("None" as const) : ("Lax" as const),
        path: "/",
      };

      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("accessToken", cookieOptions);
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase("persist/REHYDRATE", (state: any, action: any) => {
      if (typeof window !== "undefined") {
        const token = Cookies.get("accessToken");
        if (token) {
          state.token = token;
          state.isAuthenticated = true;
        }
      }
    });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;