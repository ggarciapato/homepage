import React from "react";
import './index.css';
import { 
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  CssBaseline
} from "@material-ui/core";

import { SocialHeader } from "./components/SocialHeader";
import { AboutMe } from "./components/AboutMe";
import { Projects } from "./components/Projects"

export default function App() {
  let theme = createTheme({
    typography: {
      fontFamily: "Rubik"
    }
  });
  
  theme = responsiveFontSizes(theme);

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <SocialHeader theme={theme}/>
        <Projects theme={theme}/>
        <AboutMe theme={theme}/>
      </CssBaseline>
    </ThemeProvider>
    </>
  );
}

