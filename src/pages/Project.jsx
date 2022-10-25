import { Jupyter } from "../components/Jupyter";
import { NeuroPong } from "../components/NeuroPong";
import { useLocation } from "react-router-dom";

export function Project() {
    const location = useLocation();
    if (location.state.jupyter === 'true') {
        return (
            <Jupyter 
                ipynb={require(`../ipynbs/${location.state.filename}`)}
            />
        );
    } else {
        if (location.state.tag === 'neuropong') {
            return (<NeuroPong />);
        }
    }
}