import React from "react";
import '../index.css';

import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
// import { AboutMe } from "../components/AboutMe";
// import { Projects } from "../components/Projects";
import { Footer } from "../components/Footer";

export function Frame() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
   </>
  );
}

