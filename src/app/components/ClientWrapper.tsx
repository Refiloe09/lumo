"use client";

import React from "react";
import { StateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/stateReducer";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {children}
    </StateProvider>
  );
}