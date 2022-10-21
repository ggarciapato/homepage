import React from "react";
import '../index.css';

import { Outlet } from "react-router-dom";
import { SocialHeader } from "../components/SocialHeader";
// import { AboutMe } from "../components/AboutMe";
// import { Projects } from "../components/Projects";
import { Footer } from "../components/Footer";

export function Frame(theme) {
  return (
    <>
        <SocialHeader theme={theme}/>
        <Outlet />
        <Footer theme={theme}/>
   </>
  );
}

