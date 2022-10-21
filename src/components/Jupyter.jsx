import React from "react";
// import { Typography } from "@material-ui/core";
import ReactMarkdown from "react-markdown";


function renderMarkdownCell(source) {
    return (
        <>
            {source.map((line) => 
                <ReactMarkdown> {line} </ReactMarkdown>
            )}
        </>
    )
}

export class Jupyter extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            notebook: null,
            isLoading: true
        }
    }

    async componentDidMount() {
        // const file = require(this.props.ipynb);
        // await fetch(file)
        await fetch(this.props.ipynb)
            .then((response) => response.text())
            .then(async (text) => {
                try {
                    const parsed = JSON.parse(text); 
                    this.setState({ 
                        notebook: parsed,
                        isLoading: false
                    });
                }
                catch (err) {
                    console.log(err);
                }
            });
        }
    
    render() {
        if (this.state.isLoading) { return <p> Loading... </p> }
        return (
            <>
            {this.state.notebook.cells.map(
                (cell) => (
                    cell.cell_type === "markdown" && renderMarkdownCell(cell.source)
                )
            )}
            </>
        )
    }
}
