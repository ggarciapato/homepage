import { Jupyter } from "../components/Jupyter";
import { useLocation } from "react-router-dom";

export function Project() {
    const location = useLocation();

    return (
        <Jupyter ipynb={require(`../ipynbs/${location.state.filename}`)} />
    );
}