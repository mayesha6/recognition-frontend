"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store"; // আপনার store ফাইলের সঠিক পাথ দিন

interface PageProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: PageProps) {
  return (
    <Provider store={store}>
      {/* PersistGate পেজ রিফ্রেশ হলেও স্টেট ধরে রাখতে সাহায্য করে */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}