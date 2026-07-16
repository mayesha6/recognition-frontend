"use client";

import { useAppSelector } from "@/redux/hook";

export const useCurrentUser = (): any => {
  const user = useAppSelector((state) => state.auth.user);

  return user;
};