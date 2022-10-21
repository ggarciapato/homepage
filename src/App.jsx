import React from "react";
import './index.css';

import { 
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route
} from 'react-router-dom';

import { 
    createTheme, 
    responsiveFontSizes,
    ThemeProvider,
    CssBaseline
} from "@material-ui/core";

import { Frame } from './pages/Frame';
import { Home } from "./pages/Home";
import { Project } from "./pages/Project";

let theme = createTheme({
    typography: {
      fontFamily: "Rubik"
    }
});
  
theme = responsiveFontSizes(theme);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route 
            path='/'
            element={<Frame theme={theme} />}
        >
            <Route index element={<Home theme={theme} />} />
            <Route path="projects/:project_tag" element={<Project />} />
        </Route>
        )
    );


export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <RouterProvider router={router} />
            </CssBaseline>
        </ThemeProvider>
    );
}