"use client";

import { Provider } from "react-redux"; // শুধুমাত্র এই Provider ইমপোর্ট করুন
import { store } from "./store";
import { ReactNode } from "react";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}