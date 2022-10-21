import React from "react";
import ReactMarkdown from "react-markdown";
import {
    Grid,
    Container,
    Card, 
    CardMedia, 
    CardContent
} from "@material-ui/core";


function renderMarkdownCell(source) {
    return (
        <>
            <ReactMarkdown> 
                {source.join(' ')} 
            </ReactMarkdown>
        </>
    )
}

function sortContent(cells) {
    let output = [];
    let wasImage = false;
    let wasText = false;
    cells.forEach(cell => {
        let content = {
            type: null,
            image: null,
            text: null
        }
        if (cell.cell_type === "markdown") {
            if (wasImage) {
                let previousContent = output.pop();
                previousContent['text'] = cell.source;
                output.push(previousContent);
                wasImage = false;
                // wasText = false;
                
            } else {
                let isTitle = cell.source[0].startsWith('#') 
                if (isTitle) {
                    content['type'] = 'title'
                    content['text'] = cell.source;
                    wasText = false;
                    output.push(content);
                } else {
                    if (wasText) {
                        let previousCell = output.pop();
                        previousCell.text = previousCell.text.concat(cell.source);
                        output.push(previousCell);
                    } else {
                        content.type = 'text';
                        content.text = cell.source;
                        output.push(content);
                        wasText = true;
                    }
                }
            }
        } else {
            if (cell.outputs.length === 1) {
                let op;
                [op] = cell.outputs;
                content['type'] = 'image'
                content['image'] = op.data['image/png'];
                output.push(content);
                wasImage = true;
                wasText = false;
            }

        }
    })
    return output;
}

function renderCells(content) {
    return (
        <>
            <Grid>
                {content.map(function(cell, index) {
                    return (
                        <Card key={`${cell.type} ${index}`} >
                            {cell.type === 'image' && 
                                <CardMedia 
                                    component='img' 
                                    src={`data:image/png;base64, ${cell.image}`}
                                />
                            }
                            <CardContent>
                                {renderMarkdownCell(cell.text)}
                            </CardContent>
                        </Card>
                    );
                })}
            </Grid>
        </>
    );
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
            }
        );
    }
    
    render() {
        if (this.state.isLoading) { return <p> Loading... </p> }
        const content = sortContent(this.state.notebook.cells);
        const title = content.shift();
        return (
            <>
                <Container>
                    {renderMarkdownCell(title.text)}
                </Container>
                <Container>
                    {renderCells(content)}
                </Container>
            </>
        );
    }
}