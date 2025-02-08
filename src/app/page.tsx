"use client";


import { StateProvider } from "./context/StateContext";
import reducer, { initialState } from "./context/stateReducer";

import HeroBanner from "./components/Landing/HeroBanner";
import PopularServices from "./components/Landing/PopularServices";
import Services from "./components/Landing/Services";
import FreeServices from "./components/Landing/FreeServices";



export default function Home() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <HeroBanner />
      <PopularServices />
      <Services />
      <FreeServices />
    </StateProvider>
  );
}
