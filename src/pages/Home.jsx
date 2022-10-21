import { AboutMe } from "../components/AboutMe";
import { Projects } from "../components/Projects";


export function Home(theme) {
    return (
        <>
            <Projects theme={theme}/>
            <AboutMe theme={theme}/>
        </>
    );
  }
  